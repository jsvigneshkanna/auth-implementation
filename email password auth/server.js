import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import crypto from "crypto";
import cookieParser from "cookie-parser";

// Initialise express application
const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/client/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

// database for users account
const USERS_ACCOUNT = {
  vignesh: "password1",
  kanna: "password2",
};

const USER_SESSIONS = new Map();

const USERS_PERMISSION = {
  vignesh: "admin",
  kanna: "read",
};

// starting express in port
app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

// To render index page in path - '/'
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/client/index.html");
});

// To check the login
app.post("/login", (req, res) => {
  const password = req.body.password;
  const username = req.body.username;
  const validAuth = USERS_ACCOUNT[username];
  if (validAuth) {
    if (password === validAuth) {
      const sessionId = crypto.randomUUID();
      USER_SESSIONS.set(sessionId, username);
      res
        .cookie("authSessionId", sessionId, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        })
        .redirect("/homepage");
    } else {
      res.redirect("/");
    }
  } else {
    res.send("no account");
  }
});

app.get("/homepage", (req, res) => {
  res.sendFile(__dirname + "/client/homepage.html");
});

// Homepage APIs
app.post("/check-admin", (req, res) => {
  const sessionId = req.cookies.authSessionId;
  const currentUser = USER_SESSIONS.get(sessionId);
  if (currentUser === undefined) {
    res.redirect("/");
  } else {
    if (USERS_PERMISSION[currentUser] === "admin") {
      res.send("you are authorized to use this button");
    } else {
      res.send("you are not authorized to use this button");
    }
  }
});

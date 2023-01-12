import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import session from "express-session";
import bcrypt from "bcrypt";
import crypto from "crypto";

// Initialise express application
const app = express();
const PORT = 3001;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
app.use(express.static(__dirname + "/client/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  }),
);

// database for users account
const USERS = {
  vignesh: "password1",
  kanna: "password2",
};

const sessions = new Map();
const saltRounds = 10;
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
  const validAuth = USERS[req.body.username];
  if (validAuth) {
    if (password === validAuth) {
      const sessionId = crypto.randomUUID();
      sessions.set(sessionId, req.body.username);
      res
        .cookie("authSessionId", sessionId, {
          secure: true,
          httpOnly: true,
          sameSite: "none",
        })
        .send("authed");
    } else {
      res.send("not authed");
    }
  } else {
    res.send("no account");
  }
});

app.get("/login", (req, res) => {
  console.log("gsg: ", req.body);
});

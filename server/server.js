import express from "express";

// Initialise express application
const app = express();
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("hello world");
});

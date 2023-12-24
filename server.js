const express = require("express");

const app = express();

const delay = (duration) => {
  const startTime = Date.now();
  while (Date.now() - startTime < duration) {
    //event loop is blocked
  }
};

app.get("/", (req, res) => {
  res.send(`Performance ${process.pid}`);
});

app.get("/timer", (req, res) => {
  delay(5000);
  res.send(`Performance Beep timer ${process.pid}`);
});

console.log("Worker process");
app.listen(3001);

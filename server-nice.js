const express = require("express");
const cluster = require("cluster");
const os = require("os");

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
  delay(9000);
  res.send(`Performance timer ${process.pid}`);
});

console.log(
  "This will run multiple times 1 for master and 2 for fork or worker process"
);
if (cluster.isMaster) {
  console.log("Master started, this will be executed only once");
  //Below gives us logical cores (Physical cores are different on one physical core there can be n number of logical core)
  const NUM_WORKERS = os.cpus().length;
  for (let i = 0; i < NUM_WORKERS; i++) {
    cluster.fork();
  }
  console.log(NUM_WORKERS, "Logical core size");
  //   cluster.fork();
} else {
  console.log("Worker process, executed twice");
  app.listen(3001);
}

const express = require("express");
const fs = require("fs");
const path = require("path");
const { trackDuration, metricsHandler } = require("./promClient");

const app = express();
const logFilePath = path.join(__dirname, "logs", "app.log");

// Middleware to track request duration for Prometheus
app.use(trackDuration);

// Log request details to a file
app.use((req, res, next) => {
  const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;
  fs.appendFileSync(logFilePath, logMessage);
  next();
});

// Simple home route
app.get("/", (req, res) => {
  res.send("Hello, world! This is the primary service.");
});

// Prometheus metrics route
app.get("/metrics", metricsHandler);

// Simulate error and warning logs
app.get("/warn", (req, res) => {
  const logMessage = `${new Date().toISOString()} - WARN - Something might be wrong!\n`;
  fs.appendFileSync(logFilePath, logMessage);
  res.send("Warning logged.");
});

app.get("/error", (req, res) => {
  const logMessage = `${new Date().toISOString()} - ERROR - Something went wrong!\n`;
  fs.appendFileSync(logFilePath, logMessage);
  res.status(500).send("Error logged.");
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Primary service listening on port ${port}`);
});

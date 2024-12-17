const promClient = require("prom-client");

// register the client
const register = new promClient.Registry();

const httpRequestDurationMicroseconds = new promClient.Histogram({
  name: "http_request_duration_ms",
  help: "Duration of HTTP requests in ms",
  labelNames: ["method", "route", "code"],
  buckets: [0.1, 5, 15, 50, 100, 200, 300, 400, 500], // buckets for response time from 0.1ms to 500ms
});

register.registerMetric(httpRequestDurationMicroseconds);

// collect default metrics
promClient.collectDefaultMetrics({ register });

// Request duration tracker function
const trackDuration = (req, res, next) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  res.on("finish", () => {
    end({
      method: req.method,
      route: req.route.path,
      code: res.statusCode,
    });
    console.log("Request duration tracked");
  });

  next();
};

const metricsHandler = async(req, res) => {
  res.set("Content-Type", register.contentType);
  data = await register.metrics();
  await res.end(data);
};

module.exports = {
  trackDuration,
  metricsHandler,
};

import "dotenv/config";
import * as Sentry from "@sentry/node";

console.log("SENTRY_DSN =", process.env.SENTRY_DSN);

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  sendDefaultPii: true,
  debug: true,
});

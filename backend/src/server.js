import "../instrument.mjs"; // ✅ FIRST

import express from "express";
import * as Sentry from "@sentry/node";
import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

// ✅ All routes
app.get("/", (req, res) => res.send("Hello World!"));

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

// ✅ Sentry MUST be after routes, before fallthrough handler
Sentry.setupExpressErrorHandler(app);

// ✅ Fallthrough error handler (exactly as Sentry docs show)
app.use(function onError(err, req, res, next) {
  console.log("🔴 Error handler hit:", err.message);
  res.statusCode = 500;
  res.end(res.sentry + "\n"); // res.sentry is set by Sentry automatically
});

const startServer = async () => {
  try {
    await connectDB();
    if (ENV.NODE_ENV !== "production") {
      app.listen(ENV.PORT, () => {
        console.log("Server started on port:", ENV.PORT);
      });
    }
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }
};

startServer();
export default app;

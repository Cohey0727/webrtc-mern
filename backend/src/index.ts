import app from "./app";
import dotenv from "dotenv";
import { logger, setupMongo } from "src/configs";

dotenv.config();

const PORT = process.env.PORT || 8000;

logger.info(
  JSON.stringify(
    {
      env: process.env.NODE_ENV,
      port: process.env.PORT,
    },
    null,
    "\t"
  )
);

// setup MongoDB
setupMongo();

app.listen(PORT, () => {
  logger.info(`⚡️Server is running at http://localhost:${PORT}`);
});

const shutdown = () => {
  logger.info("Received kill signal, shutting down gracefully.");
  process.exit(1);
};

// Error Handler
const uncaughtExceptionListener = (error: Error) => {
  logger.error(error.message);
  shutdown();
};

process.on("uncaughtException", uncaughtExceptionListener);
process.on("unhandledRejection", uncaughtExceptionListener);

// Signal Handler
process.on("SIGTERM", shutdown);

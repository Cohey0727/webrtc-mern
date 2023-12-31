import { verifyToken } from "src/utils";
import dotenv from "dotenv";
dotenv.config();
import { Server } from "socket.io";
import app from "./app";
import { logger, setupMongo } from "src/configs";
import { handleSocketIO } from "./services";
import createHttpError from "http-errors";

const PORT = process.env.PORT || 8000;

logger.info(
  JSON.stringify(
    {
      env: process.env.NODE_ENV,
      port: process.env.PORT,
      frontend: process.env.CLIENT_ENDPOINT,
    },
    null,
    "\t",
  ),
);

// setup MongoDB
setupMongo();

const server = app.listen(PORT, () => {
  logger.info(`⚡️Server is running at http://localhost:${PORT}`);
});

// setup WebSocket
const wsServer = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.CLIENT_ENDPOINT,
  },
});

wsServer.on("connection", async (socket) => {
  const accessToken = socket.handshake.auth.token as any;
  if (!accessToken) {
    socket.disconnect();
    return;
  }
  try {
    const payload = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!);
    if (!payload || typeof payload !== "object" || payload.userId === undefined) {
      throw createHttpError.Unauthorized("Please login first.");
    }
    const userId = payload.userId as string;
    logger.info(`User ${userId} socket connected.`);
    handleSocketIO(socket, wsServer, userId);
  } catch (error) {
    logger.error(error);
    socket.disconnect();
  }
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

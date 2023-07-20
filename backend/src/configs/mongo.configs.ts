import mongoose from "mongoose";
import logger from "./logger";

const setupMongo = () => {
  return new Promise<void>((resolve, reject) => {
    mongoose.connect(process.env.DATABASE_URL!, {}).then(() => {
      logger.info("🟢 The MongoDB is connected.");
      resolve();
    });
    mongoose.connection.on("error", (err) => {
      logger.error(`🔴 The MongoDB is not connected. ${err}`);
      reject();
    });
    if (process.env.NODE_ENV !== "production") {
      mongoose.set("debug", true);
    }
  });
};

export { setupMongo };

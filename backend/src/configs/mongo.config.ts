import { logger } from "./logger.config";
import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL!;

const setupMongo = async () => {
  mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
  });

  //mongodb debug mode
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  //mongodb connection
  mongoose.connect(DATABASE_URL).then(() => {
    logger.info("Connected to Mongodb.");
  });
};

export { setupMongo };

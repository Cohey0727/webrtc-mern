import { logger } from "./logger.config";
import mongoose from "mongoose";

const setupMongo = async () => {
  const databaseUrl = process.env.DATABASE_URL!;
  console.log({ databaseUrl });
  mongoose.connection.on("error", (err) => {
    logger.error(`Mongodb connection error : ${err}`);
    process.exit(1);
  });

  //mongodb debug mode
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  //mongodb connection
  mongoose.connect(databaseUrl).then(() => {
    logger.info("Connected to Mongodb.");
  });
};

export { setupMongo };

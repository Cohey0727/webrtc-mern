import { MongoClient } from "mongodb";
import { logger } from "./logger.config";

const DATABASE_URL = process.env.DATABASE_URL!;
const DATABASE_NAME = "WhatsApp";

class MongoDB {
  private static _connection: MongoClient | null = null;
  private constructor() {}

  public static async initialize(): Promise<void> {
    try {
      this._connection = new MongoClient(DATABASE_URL!);
      await this._connection.connect();
      logger.info("Connected to MongoDB.");
    } catch (err) {
      logger.error(`Error connecting to MongoDB: ${err}`);
      throw err;
    }
  }

  public static get client(): MongoClient {
    if (this._connection === null) {
      throw new Error("MongoDB is not initialized.");
    }
    return this._connection;
  }

  public static get db() {
    return this.client.db(DATABASE_NAME);
  }
}

const setupMongo = async () => {
  await MongoDB.initialize();
};

export { MongoDB, setupMongo };

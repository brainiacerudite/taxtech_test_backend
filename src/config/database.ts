import mongoose from "mongoose";
import { config } from ".";
import logger from "../utils/logger";

export const connectDatabase = async (): Promise<void> => {
  try {
    const mongoUri = config.MONGODB_URI;
    const mongoOptions = {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(mongoUri, mongoOptions);

    logger.info("Connected to MongoDB");

    mongoose.connection.on("error", (error) => {
      logger.error("MongoDB connection error:", error);
    });

    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected");
    });
  } catch (error) {
    logger.error("Failed to connect to MongoDB:", error);
    throw error;
  }
};

import app from "./app"
import { config } from "./config"
import { connectDatabase } from "./config/database"
import logger from "./utils/logger"

const startServer = async () => {
    // connect db
    connectDatabase()

    app.listen(config.PORT, ()=> {
        logger.info(`Server running on port ${config.PORT}`)
        logger.info(`Environment: ${config.NODE_ENV}`)
    })
}

// Graceful shutdown
process.on("SIGTERM", () => {
  logger.info("SIGTERM received, shutting down gracefully");

  process.exit(0);
});

process.on("SIGINT", () => {
  logger.info("SIGINT received, shutting down gracefully");

  process.exit(0);
});


startServer()
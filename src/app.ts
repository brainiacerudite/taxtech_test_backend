import express from "express"
import helmet from "helmet"
import hpp from "hpp"
import cors from "cors"
import { config } from "./config"
import compression from "compression"
import morgan from "morgan"
import logger from "./utils/logger"
import { notFoundHandler } from "./middleware/notFoundHandler"
import { limiter } from "./utils/rateLimiter"
import { errorHandler } from "./middleware/errorHandler"

const app = express()

// middlewares
app.use(helmet())
app.use(hpp())
app.use(cors({
    origin: config.FRONTEND_URL,
    credentials: true
}))
app.use(limiter)
app.use(compression())
app.use(morgan("combined", {
    stream: { write: (message) => logger.info(message.trim())}
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}))

// register routes
app.get("/health", (_req, res) => {
    res.status(200).json({ status: "OK", message: "Taxtech test API v1", timestamp: new Date().toDateString() })
})
// app.use('api/shipment', shipmentRoutes)

// error handlers
app.use(notFoundHandler)
app.use(errorHandler)

export default app
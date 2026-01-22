import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const envSchema = z.object({
    // Server Configuration
    NODE_ENV: z
        .enum(["development", "production", "test"])
        .default("development"),
    PORT: z
        .string()
        .regex(/^\d+$/)
        .transform(Number)
        .default(() => 3000),

    // API Configuration
    API_URL: z.url().default("http://localhost:8000"),

    // Frontend Configuration
    FRONTEND_URL: z.url().default("http://localhost:3000"),

    // Logging Configuration
    LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),

    // Database Configuration
    MONGODB_URI: z.url(),
})

const validateEnv = () => {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    console.error("Environment validation failed")
    if (error instanceof z.ZodError) {
      error.issues.forEach((err) => {
        console.error(`${err.path.join(".")}: ${err.message}`)
      })
    }
    process.exit(1)
  }
}

const env = validateEnv()

export const config = env
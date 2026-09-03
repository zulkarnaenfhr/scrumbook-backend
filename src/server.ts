import app from "./app.js";
import { pool } from "./config/database.js";
import { logger } from "./utils/logger.js";

const PORT = Number(process.env.PORT || 4000);

async function startServer() {
  try {
    logger.info("Starting ScrumBook backend", { port: PORT });

    await pool.query("SELECT 1");

    logger.info("PostgreSQL connected successfully");

    app.listen(PORT, () => {
      logger.info(`Server running at http://localhost:${PORT}`);
      logger.info(`Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    logger.error("Failed to start server", error);
    process.exit(1);
  }
}

startServer();

import app from "./app";
import dotenv from "dotenv";
import { logger } from "src/configs";

dotenv.config();

const PORT = process.env.PORT || 8000;

logger.info(
  JSON.stringify(
    {
      env: process.env.NODE_ENV,
      port: process.env.PORT,
    },
    null,
    "\t"
  )
);

app.listen(PORT, () => {
  logger.info(`⚡️Server is running at http://localhost:${PORT}`);
});

import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

console.log(
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
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

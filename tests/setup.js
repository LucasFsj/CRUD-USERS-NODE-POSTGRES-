const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

const testEnvPath = path.resolve(process.cwd(), ".env.test");
if (fs.existsSync(testEnvPath)) {
  dotenv.config({ path: testEnvPath });
} else {
  dotenv.config();
}

process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
process.env.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

const requiredEnv = ["DB_HOST", "DB_PORT", "DB_USER", "DB_NAME"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length > 0) {
  throw new Error(
    `Missing required env vars for tests: ${missing.join(", ")}.`
  );
}

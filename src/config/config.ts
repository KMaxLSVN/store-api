import * as dotenv from "dotenv";

dotenv.config({ path: "../../.env" });

export default {
  APP: process.env.APP || "development",
  PORT: process.env.PORT || "3000",
  DB_CONNECTION: {
    host: process.env.DB_HOST || "192.168.99.100",
    database: process.env.DB_NAME || "store-db",
    user: process.env.DB_USER || "sa",
    port: process.env.DB_PORT || "3306",
    password: process.env.DB_PASSWORD || "password"
  },
  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || "jwt_please_change",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10
};

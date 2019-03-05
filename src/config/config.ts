import * as dotenv from "dotenv";
dotenv.config();

export default {
  APP: process.env.APP || "development",
  PORT: process.env.PORT || "3000",

  DB_DIALECT: process.env.DB_DIALECT || "mongo",
  DB_HOST:
    process.env.DB_HOST ||
    "mongodb://sa:sapassword@cluster0-shard-00-00-vkwgu.mongodb.net:27017,cluster0-shard-00-01-vkwgu.mongodb.net:27017,cluster0-shard-00-02-vkwgu.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
  DB_NAME: process.env.DB_NAME || "example_db",
  DB_PASSWORD: process.env.DB_PASSWORD || "db-password",
  DB_PORT: process.env.DB_PORT || "27017",
  DB_USER: process.env.DB_USER || "root",

  JWT_ENCRYPTION: process.env.JWT_ENCRYPTION || "jwt_please_change",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  SALT_ROUNDS: process.env.SALT_ROUNDS || 10
};

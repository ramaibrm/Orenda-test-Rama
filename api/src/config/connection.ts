// @/connection.ts
import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const connectionString = {
  development: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_DATABASE || "orenda",
    dialect: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
  },
  test: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: "orenda_test",
    dialect: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
  },
  production: {
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: "orenda_production",
    dialect: "postgres",
    host: process.env.DB_HOST || "127.0.0.1",
  },
};

let config;
switch (process.env.NODE_ENV) {
  case "development":
    config = connectionString.development;
    break;
  case "production":
    config = connectionString.production;
    break;
  case "test":
    config = connectionString.test;
    break;
  default:
    config = connectionString.development;
}

const sequelizeConnection = new Sequelize(
  config.database,
  config.username,
  config.password!!,
  {
    host: config.host,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelizeConnection;

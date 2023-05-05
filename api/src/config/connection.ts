// @/connection.ts
import { Sequelize } from "sequelize";
import configJson from "./config.json";
import dotenv from "dotenv";
dotenv.config();

let config;
switch (process.env.NODE_ENV) {
  case "development":
    config = configJson.development;
    break;
  case "production":
    config = configJson.production;
    break;
  case "test":
    config = configJson.test;
    break;
  default:
    config = configJson.development;
}

const sequelizeConnection = new Sequelize(config.database, config.username, config.password!!, {
  host: config.host,
  dialect: 'postgres',
  logging: false,
});

export default sequelizeConnection;

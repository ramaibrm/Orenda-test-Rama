"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// @/connection.ts
const sequelize_1 = require("sequelize");
const config_json_1 = __importDefault(require("./config.json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let config;
switch (process.env.NODE_ENV) {
    case "development":
        config = config_json_1.default.development;
        break;
    case "production":
        config = config_json_1.default.production;
        break;
    case "test":
        config = config_json_1.default.test;
        break;
    default:
        config = config_json_1.default.development;
}
const sequelizeConnection = new sequelize_1.Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
    logging: false,
});
exports.default = sequelizeConnection;

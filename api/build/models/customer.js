"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
/**
 * @openapi
 * components:
 *   schema:
 *     Product:
 *       type: object
 *       required:
 *        - title
 *        - description
 *        - price
 *        - image
 *       properties:
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         price:
 *           type: number
 *         image:
 *           type: string
 */
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
class Customer extends sequelize_1.Model {
}
exports.default = Customer;
const CustomerModel = (sequelize) => {
    Customer.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: sequelize_1.DataTypes.STRING,
        },
        email: {
            type: sequelize_1.DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        address: {
            type: sequelize_1.DataTypes.STRING,
        },
    }, {
        sequelize,
        tableName: 'customers',
        timestamps: true
    });
    // Customer.belongsToMany(CustomersProducts, { through: 'customers_products' })
};
exports.CustomerModel = CustomerModel;
(0, exports.CustomerModel)(connection_1.default);

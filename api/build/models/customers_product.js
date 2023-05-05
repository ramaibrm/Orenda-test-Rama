"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersProductsModel = void 0;
// src/models/product.ts
const sequelize_1 = require("sequelize");
const customer_1 = __importDefault(require("./customer"));
const connection_1 = __importDefault(require("../config/connection"));
const product_1 = __importDefault(require("./product"));
class CustomersProducts extends sequelize_1.Model {
}
exports.default = CustomersProducts;
const CustomersProductsModel = (sequelize) => {
    CustomersProducts.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        CustomerId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        ProductId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        orderId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            unique: true,
        },
        discount: {
            type: sequelize_1.DataTypes.INTEGER,
        },
    }, {
        sequelize,
        tableName: 'customers_products',
        timestamps: true
    });
    CustomersProducts.belongsTo(customer_1.default);
    CustomersProducts.belongsTo(product_1.default);
};
exports.CustomersProductsModel = CustomersProductsModel;
(0, exports.CustomersProductsModel)(connection_1.default);

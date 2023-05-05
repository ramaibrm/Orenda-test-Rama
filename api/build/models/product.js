"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
// src/models/product.ts
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../config/connection"));
class Product extends sequelize_1.Model {
}
exports.default = Product;
const ProductModel = (sequelize) => {
    Product.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: sequelize_1.DataTypes.STRING(255),
            allowNull: false,
        },
        unit: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
        price: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'products',
        timestamps: true
    });
    // Product.belongsTo(CustomersProducts, { onDelete: 'CASCADE' });
};
exports.ProductModel = ProductModel;
(0, exports.ProductModel)(connection_1.default);

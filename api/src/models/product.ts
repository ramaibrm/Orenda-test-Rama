// src/models/product.ts
import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Customer, { CustomerModel } from './customer';
import database from "../config/connection";
import CustomersProducts from './customers_product';
export default class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  public id?: number;
  public name!: string;
  public unit!: string;
  public price!: string;
  public deletedAt?: Date;
}

export const ProductModel = (sequelize: Sequelize) => {
    Product.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    unit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'products',
    timestamps: true
  });
}

ProductModel(database)
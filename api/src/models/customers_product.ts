// src/models/product.ts
import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import Customer, { CustomerModel } from './customer';
import database from "../config/connection";
import Product from './product';
export default class CustomersProducts extends Model<InferAttributes<CustomersProducts>, InferCreationAttributes<CustomersProducts>> {
  public id?: number;
  public CustomerId!: number;
  public ProductId!: number;
  public orderId!: string;
  public discount?: number;
}

export const CustomersProductsModel = (sequelize: Sequelize) => {
    CustomersProducts.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    CustomerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    discount: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    tableName: 'customers_products',
    timestamps: true
  });
  CustomersProducts.belongsTo(Customer);
  CustomersProducts.belongsTo(Product);
}

CustomersProductsModel(database)
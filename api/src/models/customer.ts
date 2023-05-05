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
import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import database from "../config/connection";
import Product, { ProductModel } from './product';
import CustomersProducts from './customers_product';
export default class Customer extends Model<InferAttributes<Customer>, InferCreationAttributes<Customer>> {
  public id?: number;
  public name!: string;
  public phone?: string;
  public email?: string;
  public address?: string;
  public deletedAt?: Date;
}

export const CustomerModel = (sequelize: Sequelize) => {
  Customer.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    address: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    tableName: 'customers',
    timestamps: true
  });
}

CustomerModel(database)
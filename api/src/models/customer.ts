import { Model, Sequelize, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import database from "../config/connection";
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
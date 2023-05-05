// src/routes/user.routes.ts
import Customer, { CustomerModel } from "../models/customer";
import database from "../config/connection";
import * as Joi from 'joi';
import { Request, Response, NextFunction } from "express";
import Product from "../models/product";
import CustomersProducts from "../models/customers_product";

export default class CustomerController {
  static async FindAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Customer.findAll({ where: { deletedAt: null as any } });
      res.status(200).json(result);
    } catch (err) {
      next(err)
    }
  }
  static async FindOne(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.number();
      const paramsValidation = paramSchema.validate(req.params.id)
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message }
      }
      const id: number = parseInt(req.params.id);
      const result = await Customer.findOne({ where: { id }});
      res.status(200).json(result);
    } catch (err) {
      next(err)
    }
  }
  static async Create(req: Request, res: Response, next: NextFunction) {
    try {
      CustomerModel(database)
      const schema = Joi.object().keys({ 
        name: Joi.string().alphanum().min(3).required(),
        phone: Joi.number().min(3),
        email: Joi.string().email(),
        address: Joi.string(),
      }); 
      const newCustomer = req.body as Customer
      const validation = schema.validate(newCustomer)
      if (validation.error) {
        throw { status: 400, message: validation.error.message }
      }
      const result = await Customer.create(newCustomer);
      res.status(200).json(result);
    } catch (err) {
      next(err)
    }
  }
  static async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.number();
      const bodySchema = Joi.object().keys({ 
        name: Joi.string().alphanum().min(3).required(),
        phone: Joi.number().min(3),
        email: Joi.string().email(),
        address: Joi.string(),
      }); 
      const newCustomer = req.body as Customer
      const validation = bodySchema.validate(newCustomer)
      const paramsValidation = paramSchema.validate(req.params.id)
      if (validation.error) {
        throw { status: 400, message: validation.error.message }
      }
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message }
      }
      const id: number = parseInt(req.params.id);
      const result = await Customer.update(newCustomer, { where: { id }, returning: true })
      res.status(200).json(result[1][0]);
    } catch (err) {
      next(err)
    }
  }
  static async Delete(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.number();
      const paramsValidation = paramSchema.validate(req.params.id)
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message }
      }
      const id: number = parseInt(req.params.id);
      const foundCustomer = await Customer.findOne({ where: {id} });
      if (!foundCustomer) throw { status: 404, message: "Customer data not found." }
      foundCustomer.update({ deletedAt: new Date() })
      res.status(200).json({ message: "Customer successfully deleted" });
    } catch (err) {
      next(err)
    }
  }
}

// src/routes/user.routes.ts
import Product, { ProductModel } from "../models/product";
import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import CustomersProducts from "../models/customers_product";

export default class ProductController {
  static async FindAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Product.findAll({ where: { deletedAt: null as any } });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async FindOne(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.number();
      const paramsValidation = paramSchema.validate(req.params.id);
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message };
      }
      const id: number = parseInt(req.params.id);
      const result = await Product.findOne({ where: { id } });
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).required(),
        unit: Joi.number().min(0).required(),
        price: Joi.number().min(0).required(),
      });
      const newProduct = req.body as Product;
      const validation = schema.validate(newProduct);
      if (validation.error) {
        throw { status: 400, message: validation.error.message };
      }
      const result = await Product.create(newProduct);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async Update(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.number();
      const bodySchema = Joi.object().keys({
        name: Joi.string().alphanum().min(3).required().required(),
        unit: Joi.number().min(0).required(),
        price: Joi.number().min(0).required(),
      });
      const newProduct = req.body as Product;
      const validation = bodySchema.validate(newProduct);
      const paramsValidation = paramSchema.validate(req.params.id);
      if (validation.error) {
        throw { status: 400, message: validation.error.message };
      }
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message };
      }
      const id: number = parseInt(req.params.id);
      const result = await Product.update(newProduct, {
        where: { id },
        returning: true,
      });
      res.status(200).json(result[1][0]);
    } catch (err) {
      next(err);
    }
  }
  static async Delete(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.number();
      const paramsValidation = paramSchema.validate(req.params.id);
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message };
      }
      const id: number = parseInt(req.params.id);
      const foundProduct = await Product.findOne({ where: { id } });
      if (!foundProduct)
        throw { status: 404, message: "Product data not found." };
      // const foundCustomerProducts = await CustomersProducts.findAll();
      // for (const cp of foundCustomerProducts) {
      //   if (cp.ProductId && cp.ProductId === id) {
      //     cp.destroy();
      //   }
      // }
      foundProduct.update({ deletedAt: new Date() });
      res.status(200).json({ message: "Product successfully deleted" });
    } catch (err) {
      next(err);
    }
  }
}

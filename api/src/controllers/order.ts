// src/routes/user.routes.ts
import Product, { ProductModel } from "../models/product";
import CustomersProducts, { CustomersProductsModel } from "../models/customers_product";
import * as Joi from "joi";
import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import uniqid from 'uniqid';
import dotenv from "dotenv";
import Customer from "../models/customer";
dotenv.config();

export default class OrderController {
  static async FindAll(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await Product.findAll();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
  static async FindOne(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.string();
      const paramsValidation = paramSchema.validate(req.params.id);
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message };
      }
      const foundOrders : any = await CustomersProducts.findAll({ where: { orderId: req.params.id }, include: [ { model: Product } ]   });
      if (!foundOrders) throw { status: 404, message: "Order not found." }
      const foundCustomer = await Customer.findOne({ where: { id: foundOrders[0].CustomerId }  });
      if (!foundCustomer) throw { status: 404, message: "Customer not found." }
      const products = []
      let totalPrice = 0
      for (const order of foundOrders) {
        if (order.discount) {
          totalPrice += order.discount
        } else {
          order.Product.price
        }
        products.push({...order.Product.dataValues, discountedPrice: order.discount})
      }
      const result = {
        ...foundCustomer.dataValues,
        totalPrice,
        totalProducts: products.length,
        products,
      }
      res.status(200).json({ Customer: result });
    } catch (err) {
      next(err);
    }
  }
  static async FindOneByCustomer(req: Request, res: Response, next: NextFunction) {
    try {
      const paramSchema = Joi.number();
      const paramsValidation = paramSchema.validate(req.params.id);
      if (paramsValidation.error) {
        throw { status: 400, message: paramsValidation.error.message };
      }
      const foundOrders : any = await CustomersProducts.findAll({ where: { CustomerId: req.params.id }, include: [ { model: Product } ]   });
      if (!foundOrders) throw { status: 404, message: "Order not found." }
      const foundCustomer = await Customer.findOne({ where: { id: req.params.id }  });
      if (!foundCustomer) throw { status: 404, message: "Customer not found." }
      const products = []
      let totalPrice = 0
      for (const order of foundOrders) {
        if (order.discount) {
          totalPrice += order.discount
        } else {
          order.Product.price
        }
        products.push({...order.Product.dataValues, discountedPrice: order.discount})
      }
      console.log(products)
      const result = {
        ...foundCustomer.dataValues,
        totalPrice,
        totalProducts: products.length,
        products,
      }
      res.status(200).json({ Customer: result });
    } catch (err) {
      next(err);
    }
  }
  static async Create(req: Request, res: Response, next: NextFunction) {
    try {
      const schema = Joi.object().keys({
        products: Joi.array().items(
          Joi.object().keys({
            productId: Joi.number().min(0).required(),
            discount: Joi.number().min(0)
          }).required()
        ).required(),
        customer: Joi.number().required()
      });
      const validation = schema.validate(req.body);
      if (validation.error) {
        throw { status: 400, message: validation.error.message };
      }
      interface IOrder {
        products: {
          productId: number;
          discount: number;
        }[],
        customer: number;
      }
      const orders : IOrder = req.body;
      const allOrders = []
      // const secret_jwt = process.env.JWT_SECRET || "xae1a12"
      const orderId = uniqid()
      for (const product of orders.products) {
        const newOrder = {
          CustomerId: orders.customer,
          ProductId: product.productId,
          discount: product.discount,
          orderId: orderId
        }
        const result = await CustomersProducts.create(newOrder)
        allOrders.push(result)
      }
      // const result = await Product.create(newOrder);
      res.status(200).json({message: "Order successfully created", orderId});
    } catch (err) {
      next(err);
    }
  }
}

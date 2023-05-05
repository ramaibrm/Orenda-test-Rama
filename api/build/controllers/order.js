"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/user.routes.ts
const product_1 = __importDefault(require("../models/product"));
const customers_product_1 = __importDefault(require("../models/customers_product"));
const Joi = __importStar(require("joi"));
const uniqid_1 = __importDefault(require("uniqid"));
const dotenv_1 = __importDefault(require("dotenv"));
const customer_1 = __importDefault(require("../models/customer"));
dotenv_1.default.config();
class OrderController {
    static FindAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield product_1.default.findAll();
                res.status(200).json(result);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static FindOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramSchema = Joi.string();
                const paramsValidation = paramSchema.validate(req.params.id);
                if (paramsValidation.error) {
                    throw { status: 400, message: paramsValidation.error.message };
                }
                const foundOrders = yield customers_product_1.default.findAll({ where: { orderId: req.params.id }, include: [{ model: product_1.default }] });
                if (!foundOrders)
                    throw { status: 404, message: "Order not found." };
                const foundCustomer = yield customer_1.default.findOne({ where: { id: foundOrders[0].CustomerId } });
                if (!foundCustomer)
                    throw { status: 404, message: "Customer not found." };
                const products = [];
                for (const order of foundOrders) {
                    products.push(order.Product);
                }
                const result = Object.assign(Object.assign({}, foundCustomer.dataValues), { products });
                res.status(200).json(result);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static FindOneByCustomer(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramSchema = Joi.number();
                const paramsValidation = paramSchema.validate(req.params.id);
                if (paramsValidation.error) {
                    throw { status: 400, message: paramsValidation.error.message };
                }
                const foundOrders = yield customers_product_1.default.findAll({ where: { CustomerId: req.params.id }, include: [{ model: product_1.default }] });
                if (!foundOrders)
                    throw { status: 404, message: "Order not found." };
                const foundCustomer = yield customer_1.default.findOne({ where: { id: req.params.id } });
                if (!foundCustomer)
                    throw { status: 404, message: "Customer not found." };
                const products = [];
                for (const order of foundOrders) {
                    products.push(order.Product);
                }
                const result = Object.assign(Object.assign({}, foundCustomer.dataValues), { products });
                res.status(200).json(result);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static Create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const schema = Joi.object().keys({
                    products: Joi.array().items(Joi.object().keys({
                        productId: Joi.number().min(0).required(),
                        discount: Joi.number().min(0)
                    }).required()).required(),
                    customer: Joi.number().required()
                });
                const validation = schema.validate(req.body);
                if (validation.error) {
                    throw { status: 400, message: validation.error.message };
                }
                const orders = req.body;
                const allOrders = [];
                // const secret_jwt = process.env.JWT_SECRET || "xae1a12"
                // const jwtHash = jwt.sign({ id: req.params.id }, secret_jwt)
                for (const product of orders.products) {
                    const newOrder = {
                        CustomerId: orders.customer,
                        ProductId: product.productId,
                        discount: product.discount,
                        orderId: (0, uniqid_1.default)()
                    };
                    const result = yield customers_product_1.default.create(newOrder);
                    allOrders.push(result);
                }
                // const result = await Product.create(newOrder);
                res.status(200).json(allOrders);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = OrderController;

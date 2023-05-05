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
const Joi = __importStar(require("joi"));
const customers_product_1 = __importDefault(require("../models/customers_product"));
class ProductController {
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
                const paramSchema = Joi.number();
                const paramsValidation = paramSchema.validate(req.params.id);
                if (paramsValidation.error) {
                    throw { status: 400, message: paramsValidation.error.message };
                }
                const id = parseInt(req.params.id);
                const result = yield product_1.default.findOne({ where: { id } });
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
                    name: Joi.string().alphanum().min(3).required(),
                    unit: Joi.number().min(0).required(),
                    price: Joi.number().min(0).required(),
                });
                const newProduct = req.body;
                const validation = schema.validate(newProduct);
                if (validation.error) {
                    throw { status: 400, message: validation.error.message };
                }
                const result = yield product_1.default.create(newProduct);
                res.status(200).json(result);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static Update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramSchema = Joi.number();
                const bodySchema = Joi.object().keys({
                    name: Joi.string().alphanum().min(3).required().required(),
                    unit: Joi.number().min(0).required(),
                    price: Joi.number().min(0).required(),
                });
                const newProduct = req.body;
                const validation = bodySchema.validate(newProduct);
                const paramsValidation = paramSchema.validate(req.params.id);
                if (validation.error) {
                    throw { status: 400, message: validation.error.message };
                }
                if (paramsValidation.error) {
                    throw { status: 400, message: paramsValidation.error.message };
                }
                const id = parseInt(req.params.id);
                const result = yield product_1.default.update(newProduct, {
                    where: { id },
                    returning: true,
                });
                res.status(200).json(result[1][0]);
            }
            catch (err) {
                next(err);
            }
        });
    }
    static Delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const paramSchema = Joi.number();
                const paramsValidation = paramSchema.validate(req.params.id);
                if (paramsValidation.error) {
                    throw { status: 400, message: paramsValidation.error.message };
                }
                const id = parseInt(req.params.id);
                const foundProduct = yield product_1.default.findOne({ where: { id } });
                if (!foundProduct)
                    throw { status: 404, message: "Product data not found." };
                const foundCustomerProducts = yield customers_product_1.default.findAll();
                for (const cp of foundCustomerProducts) {
                    if (cp.ProductId && cp.ProductId === id) {
                        cp.destroy();
                    }
                }
                foundProduct.destroy();
                res.status(200).json(foundProduct);
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = ProductController;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_1 = __importDefault(require("../controllers/customer"));
const product_1 = __importDefault(require("../controllers/product"));
const order_1 = __importDefault(require("../controllers/order"));
const router = express_1.default.Router();
// Customer Endpoints
router.get("/customers", customer_1.default.FindAll);
router.get("/customer/:id", customer_1.default.FindOne);
router.post("/customer", customer_1.default.Create);
// router.post("/customer", decode, CustomerController.Create); // with JWT
router.put("/customer/:id", customer_1.default.Update);
router.delete("/customer/:id", customer_1.default.Delete);
// Product Endpoints
router.get("/products", product_1.default.FindAll);
// router.post("/product", decode,  ProductController.Create); // with JWT
router.post("/product", product_1.default.Create);
router.put("/product/:id", product_1.default.Update);
router.delete("/product/:id", product_1.default.Delete);
// Order Endpoints
router.get("/order/:id", order_1.default.FindOne);
router.get("/orderByCustomer/:id", order_1.default.FindOneByCustomer);
// router.post("/create-order", decode, OrderController.Create); // with JWT
router.post("/create-order", order_1.default.Create);
exports.default = router;

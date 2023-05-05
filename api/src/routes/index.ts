
import express from "express";
import CustomerController from "../controllers/customer";
import ProductController from "../controllers/product";
import OrderController from "../controllers/order";
import { decode } from "../utils/jwt";
const router = express.Router();


// Customer Endpoints
router.get("/customers", CustomerController.FindAll);
router.get("/customer/:id", CustomerController.FindOne);
router.post("/customer", CustomerController.Create);
// router.post("/customer", decode, CustomerController.Create); // with JWT
router.put("/customer/:id", CustomerController.Update);
router.delete("/customer/:id", CustomerController.Delete);

// Product Endpoints
router.get("/products", ProductController.FindAll);
// router.post("/product", decode,  ProductController.Create); // with JWT
router.post("/product", ProductController.Create);
router.put("/product/:id", ProductController.Update);
router.delete("/product/:id", ProductController.Delete);

// Order Endpoints
router.get("/order/:id", OrderController.FindOne);
router.get("/orderByCustomer/:id", OrderController.FindOneByCustomer);
// router.post("/create-order", decode, OrderController.Create); // with JWT
router.post("/create-order", OrderController.Create); 



export default router;
import { Router } from "express";
import verifyAdmin from "../../helpers/verifyAdmin";
import Controller from "./products.controller";

const product: Router = Router();
const controller = new Controller();

// Retrieve all products
product.get("/:page*?", controller.getProducts);

// Add a product
product.put("/", verifyAdmin, controller.addProduct);

export default product;

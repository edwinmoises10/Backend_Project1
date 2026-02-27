import { Router } from "express";
import apiProducts from "./products.router.js";
import apiCart from "./cart.router.js";

const router = Router();

//!Products Route
router.use("/products", apiProducts);

//!Cart Route
router.use("/carts", apiCart);

export default router;

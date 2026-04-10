import { Router } from "express";
import { cartRepository } from "../repositories/cart_repository.js";

const router = Router();

router.post("/", async (req, res, next) => {
    try {
        const response = await cartRepository.create();
        res.status(201).json({ status: "success", payload: response });
    } catch (e) {
        next(e);
    }
});

router.get("/:cid", async (req, res, next) => {
    try {
        const { cid } = req.params;
        const response = await cartRepository.getById(cid);
        res.status(200).json({ status: "success", payload: response });
    } catch (e) {
        next(e);
    }
});

router.post("/:cid/product/:pid", async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const response = await cartRepository.addProductToCart(cid, pid);
        res.status(200).json({ status: "success", payload: response });
    } catch (e) {
        next(e);
    }
});

export default router;
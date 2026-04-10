import { Router } from "express";
import { cartRepository } from "../repositories/cart_repository.js";

const router = Router();


router.get("/", async (req, res, next) => {
    try {
        const response = await cartRepository.getCars();
        res.status(200).json({ status: "success", payload: response });
    } catch (e) {
        next(e);
    }
});

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

router.delete('/:cid/products/:pid', async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const result = await cartRepository.delete_car_product(cid, pid);
        res.status(200).json({ status: "success", message: "Producto eliminado", payload: result });
    } catch (error) {
        next(error)
    }
});

router.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const body = req.body; // Se espera { "product": "ID", "quantity": 10 }
        const result = await cartRepository.add_products_cid(cid, body);
        res.status(200).json({ status: "success", message: "Producto agregado", payload: result });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
});

router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const body = req.body; // Se espera { "quantity": 5 }
        const result = await cartRepository.add_quantity(cid, pid, body);
        res.status(200).json({ status: "success", message: "Cantidad actualizada", payload: result });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
});

router.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const result = await cartRepository.delete_all_products(cid);
        res.status(200).json({ status: "success", message: "Carrito vaciado", payload: result });
    } catch (error) {
        res.status(404).json({ status: "error", message: error.message });
    }
});

export default router;
import { Router } from "express";
import { productRepository } from "../repositories/product_repository.js";
import { verifyProductInputs, verifyProductsModifier } from "../middleware/product.middleware.js";
verifyProductInputs


const router = Router()

router.get("/", async (req, res, next) => {
    try {
        const response = await productRepository.getAll()
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})


router.get("/:id", async (req, res, next) => {
    try {
        //!   /:id Se extrae el id con req.params 
        const { id } = req.params
        const response = await productRepository.getById(id)
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})


router.post("/", verifyProductInputs, async (req, res, next) => {
    try {
        // !req.body para obtener los parametros con el metodo post
        const response = await productRepository.create(req.body)
        res.status(201).json(response)
    } catch (e) {
        next(e)
    }
})

router.put("/:id", verifyProductsModifier, async (req, res, next) => {
    try {

        const { id } = req.params
        const response = await productRepository.update(id, req.body)
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {

        const { id } = req.params
        const response = await productRepository.delete(id)
        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
})

export default router
import { Router } from 'express';
import { cartManager } from '../manager/cartManager.js';

const router = Router();

router.post('/', (req, res) => {
  try {
    const newCart = cartManager.createCart();
    res.status(200).json(newCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
router.get('/:cid', (req, res) => {
  try {
    const { cid } = req.params;
    const getByID = cartManager.getCartByID(cid);
    res.status(200).json(getByID);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
router.post('/:cid/product/:pid', (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;

    const checkProduct = productManager.productByID(pid);

    if (!checkProduct) {
      return res
        .status(404)
        .json({ message: 'Product not found in inventory' });
    }

    const updateCart = cartManager.addItemsToCart(cid, pid);
    res.status(201).json(updateCart);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default router
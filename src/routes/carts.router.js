import  express from 'express';
import { CartManager } from '../manager/cartsManager.js';

const router = express.Router()

router.post('/', async (req, res) => {
    try {
        const newCart = await CartManager.addCart();
        res.json( { status: 'success', payload: newCart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/:cid", async (req, res) => {
    try {
        const id = parseInt(req.params.cid);
        const cart = await CartManager.getCartById(id);
        res.json( { status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
})

router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const cart = await CartManager.addProduct(cartId, productId);
        res.json( { status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);
        const cart = await CartManager.deleteProduct(cartId, productId);
        res.json( { status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;
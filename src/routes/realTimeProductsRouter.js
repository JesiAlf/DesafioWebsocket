import express from "express";
import { ProductManager } from "../manager/productsManager.js";

const router = express.Router();

router.get("/api/products", async (req, res) => {
  try {
    const products = await ProductManager.getInstance().getProducts();
    res.render("realTimeProducts", {
      title: "real time products",
      products: products,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error del servidor");
  }
});

router.post("/api/products", async (req, res) => {
  try {
    const newProduct = req.body;
    await ProductManager.getInstance().addProduct(newProduct);
    const updateProduct = await ProductManager.getInstance().getProducts();
    io.emit("newProduct", updateProduct);
    res
      .status(200)
      .json({ status: "success", message: "Producto agregado exitosamente" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

export default router;

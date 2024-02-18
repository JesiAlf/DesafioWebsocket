import express from "express";
import { ProductManager } from "../manager/productsManager.js";

const router = express.Router();

router.get("/", (req, res) => { 
  const p= new ProductManager();
  const Product= p.getProduct();
  res.render("realTimeProduts",{
    Product
  });
});
  /*try {
    const products = await ProductManager.getInstance().getProducts();
    res.render("realTimeProducts", {
      title: "real time products",
      products: products,
    });
  } catch (error) {
    console.error("Error al obtener los productos:", error);
    res.status(500).send("Error del servidor");
  }*/

router.post("/", (req, res) => {
  const p= new ProductManager();
  const addProduct= p.addProduct();
  res.render("realTimeProduts",{
    addProduct
  });
});
  router.delete("/", (req, res) => {
    const p= new ProductManager();
    const deleteProduct= p.deleteProduct();
    res.render("realTimeProduts",{
      deleteProduct
    });
/*router.post("/", async (req, res) => {
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
  }*/
});

export default router;

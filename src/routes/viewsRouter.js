/*import express from "express";
import { ProductManager } from "../manager/productsManager.js";
import path from "path";

const FilePath = path.join(__dirname, "..", 'data', "products.json");
const productManager = new ProductManager(FilePath);
const router = express.Router();

router.get("/api/products", async (req, res) => {
  try {
    const allProducts = await productManager.getProducts();

    res.render("realTimeProducts", {
      page: "realTimeProducts",
      products: allProducts,
    });
  } catch (error) {
    console.error("error al obtener los productos:", error);
    res.status(500).send("errpr del servidor");
  }
});*/
import express from "express";
import { ProductManager } from "../manager/productsManager.js";

const productManager = new ProductManager();

const router = express.Router();

router.get("/realitimeproducts", async (req, res) => {
  const allProducts = await productManager.getProducts();
  res.render("realTimeProducts", {
    page: "Real-Time Products",
    products: allProducts,
  });
});
export default router;

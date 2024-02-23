
import express from "express";
import { ProductManager } from "../manager/productsManager.js";

const productManager = new ProductManager();

const router = express.Router();

router.get("/",  (req, res) => {
  const products =  productManager.getProduct();
  res.render("realTimeProducts", {
  products,
  });
});
export default router;

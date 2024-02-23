import express from "express";
import { ProductManager } from "../manager/productsManager.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const p = new ProductManager();
  const Product = p.getProduct();
  res.render("realTimeProducts", {
    Product,
  });
});

/*router.post("/", (req, res) => {
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

});*/

export default router;

import express from "express";
import {ProductManager} from "../manager/productsManager.js"



const router = express.Router();



router.use((req,res)=>{
  if(req==="POST"|| req==="PUT"){
  const{title,descripción,code,price,category,thumbnail}=req.body;
  if(!title||!descripción||price|| category|| code||stock||thumbnail);
  return res.status(400).json({error:"Todos los campos son obligatorios"});
}
})

router.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query);
    const productManager=new ProductManager("./products.json")
    const products = await productManager.getProduct();
    if (!isNaN(limit) && limit > 0) {
      const showProducts = products.slice(0, limit);
        res.json(showProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
   
router.get("/products/:pid", async (req, res) => {
  try {
    const id=parseInt(req.params.pid);
    //const p=new ProductManager("./products.json")
    const products = await ProductManager.getProductById (id);
    res.json({ status: "success", payload: products });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/products", async (req, res) => {
  try {
    const product = req.body;
    const newProduct = await ProductManager.addProduct(product);
    res.json({ status: "sucess", payload: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:pid", async(req, res)=>{
  try{
    const id=parseInt(req.params.pid);
    const product=req.body;
    const updateProduct= await ProductManager.updateProduct(id, product);
    res.json({status: "success", payload: updateProduct});
  }catch(error){
    res.status(500).json({error:error.message});
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const id= parseInt (req.params.pid);
    const deleteProduct = await ProductManager.deleteProduct(id);
    res.json({ status: "sucess", payload: deleteProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


export default router;

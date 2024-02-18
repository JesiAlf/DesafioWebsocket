import{Server} from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import path from'path';
import express from"express";
import {ProductManager} from "./manager/productsManager.js";
import { fileURLToPath } from "url";
//import cartsRouter from"./routes/";
//import {productRouter} from"./routes/productRouter.js";

const __filename=fileURLToPath(import.meta.url)
const __dirname=path.dirname(__filename)

//Middlewares
const app = express()
const PORT=8080;
const httpServer=app.listen(PORT,()=>console.log(`server runing o post ${PORT}`));
const socketServer= new Server(httpServer);
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/views")))


//importamos el archivo q esta en esta ruta 
//import{dirname,join}from'path';




//app.use("/api/products",productRouter)
//app.use("/api/carts",cartsRouter)
app.use("/",viewsRouter);


//estructura codigo handlebans_

app.engine("handlebars",handlebars.engine());

//tenemos que setear, debemos decir q nuestro views engines y la extencion de los archivo estan en handlebars._

app.set("view  engine","handlebars");
//luego decirles donde estan esos archivos_

app.set("views",path.join(__dirname +" /views"));





//conexiion con socket.io_


socketServer.on("connection", socket=>{
    console.log("Nueva conexion");
    socket.on("message", data=>{
        console.log(data);
    })


socket.on("newProduct", async (newProduct)=>{
    try {
        const Product={
title: newProduct.title,
descripción: newProduct.description,
price: newProduct.price,
stock: newProduct.stock,
thumbnail:newProduct.thumbnail,

        };

    const pushNewProduct= await ProductManager.getInstance().addProduct(Product);
    const pushId=pushNewProduct.id;
    io.emit("responde",{status:"success",message:`product ${pushId}successfully added`});
    } catch (error){
    io.emit("responde",{status:"error",message:error.message});
    }
    }); 

    socket.on("deleteProduct",async(id)=>{
        try {
        const pId=parseInt(id);
        await ProductManager.getInstance().deleteProduct(pId);
        const updatedList= await ProductManager.getInstance().getProduct();
        socket.emit("products", updatedList);
        socket.emit("responde",{status:"success",message:"Product delete successfully"});
    }catch (error){
        socket.emit("responde",{status:"error",message: error.message});
        }
        });
    
    })  
    
import{Server} from "socket.io";
import handlebars from "express-handlebars";
import viewsRouter from "./routes/viewsRouter.js";
import path from'path'
import express from"express";
import {ProductManager} from "./manager/productsManager.js";

//Middlewares
const app = express()
const PORT=8080;
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//importamos el archivo q esta en esta ruta 
import { fileURLToPath } from "url";
import{dirname,join}from'path';

const __filename=fileURLToPath(import.meta.url)
const __dirname=dirname(__filename)

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")))


//export default __dirname;


//estructura codigo handlebans_

app.engine("handlebars",handlebars.engine());

//luego decirles donde estan esos archivos_

app.set("views",__dirname +" /views");

//tenemos que setear, debemos decir q nuestro views engines y la extencion de los archivo estan en handlebars._

app.set("view  engine","handlebars");


const httpServer=app.listen(PORT,()=>console.log(`server runing o post ${PORT}`));

//conexiion con socket.io_

const socketServer=new Server(httpServer)

app.use("/",viewsRouter);

socketServer.on("connection", socket=>{
    console.log("Nueva conexion")
    socket.on("message", data=>{
        socket.emit("mensaje",data)
    })


socket.on("newProduct", async (newProduct)=>{
    try {
        const ProductsAdd={
title: newProduct.title,
descripción: newProduct.description,
price: newProduct.price,
stock: newProduct.stock,
thumbnail:newProduct.thumbnail,

        };

    const pushNewProduct= await ProductManager.getInstance().addProduct(ProductsAdd);
    const pushId=pushNewProduct.id;
    io.emit("responde",{status:"success",message:`product ${pushId}successfully added`});
    } catch (error){
    io.emit("responde",{status:"error",message:error.message});
    }
    }); 

    socket.on("delete-product",async(id)=>{
        try {
        const pId=parseInt(id);
        await ProductManager.getInstance().deleteProduct(pId);
        const updatedList= await ProductManager.getInstance().getProduct();
        io.emit("products", updatedList);
        io.emit("responde",{status:"success",message:"Product delete successfully"});
    }catch (error){
        io.emit("responde",{status:"error",message: error.message});
        }
        });
    
    })  
    
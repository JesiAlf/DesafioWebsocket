import fs from "fs";

export class ProductManager {
  constructor() {
    this.products = [];
    this.path = "./data/products.json";
  }
  
  addProduct(product) {
    //obtengo los archivos mandando a llamar al getProduct para q mi arreglo de getproduct este acrttualizado y verificar que el codigo no se repita
    this.getProduct();
    //establezco y desestructuro el objeto con las variables que contiene
    const { title, description, price, thumbnail, code, stock } = product;
    //para asegurar que todos los campos esten, establecemos una condición, que tdos los campos existan o que retorne un mensaje
    //usamos el or || para que entren todos los camposmpor si falta uno solo
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("All fields are required");
      return;
    }
    //si dentro del arreglo tengo un producto con el mismo codigo, manda un mensaje de error
    if (this.products.some((p) => p.code === code)) {
      console.log("the code already exists");
      return;
    }
    
    const id = this.getId();
    //coloco en el arreglo el objeto producto desparramado mas el id
    this.products.push({ id, ...product });

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("saved data successfully");
    } catch (error) {
      console.error("An error occurred while reading the files", error);
    }
  }

   getProduct() {
    try {
      const data = fs.readFileSync(this.path, "utf8");
      //el archivo como va a contener texto, tengo que parcearlo para que vuelva a hacer un arreglo de objetos y se lo asignamos a nuestros arreglo de productos el que se sobreescribe con lo q tenga el archivo y se actualiza, cada vez q se llame al getproducts
      JSON.parse(data);
      return this.products;

    } catch (error) {
      console.log("An error occurred while reading the files", error);
    return [];
    }
  }

  getProductById(pid) {
    this.getProduct();

    const product = this.products.find((p) => p.id === pid);
    if (product === undefined) {
      console.log(`the product with the ID ${id} not exist`);
    } else return product;
  }
  //creo id unico y creo una variable this.getid y si ya existe, le sumo un numero e incrementando el id a medida q se ingrese si ya existe
  getId() {
    this.LId = this.getLId();
    if (this.LId === 0) this.LId = 1;
    else this.LId++;
    return this.LId;
  }

  getLId() {
    if (this.products.length === 0) return 0;
    const LId = this.products[this.products.length - 1].id;
    console.log("the last id is ", LId);
    return LId;
  }

  updateProduct(id, productoActual) {
    this.getProduct();
    if (this.products.find((product) => product.id === id) === undefined) {
      console.error(`the ID ${id} noy exist`);
      return;
    }
    const indice = this.products.findIndex((product) => product.id === id);
    this.products[indice] = { id, ...productoActual };

    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("field actually");
    } catch (error) {
      console.error("the field didnt actually", error);
    }
  }

  deleteProduct(id) {
    this.getProduct();
    if (this.products.find((product) => product.id === id) === undefined) {
      console.error(`the ID ${id} noy exist`);
      return;
    }

    const indice = this.products.findIndex((product) => product.id === id);
    this.products.splice(indice, 1);
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products));
      console.log("delete product");
    } catch (error) {
      console.log("mistake to delete", error);
    }
  }
}

import express from "express";
import ProductManager from "./manager/ProductManager.js";

const PORT = 8080;
const manager = new ProductManager('../files/bd.json');
const app = express();

app.use(express.urlencoded({extended:true}))
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en el puerto ${PORT}`);
})

app.get('/products', async (req,res)=>{
    const limit = req.query.limit
    const products = await manager.getProducts();

    if (!limit) {
        res.send(products);
    } else {
        const productsLimit = products.slice(0, parseInt(limit));
        res.send(productsLimit);
    }
})

app.get('/products/:id', async (req,res)=>{
    const id = req.params.id;
    const product = await manager.getProductById(id);
    res.send(product);
})
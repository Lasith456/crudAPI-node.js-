const { error } = require('console');
const express=require('express')
const mongoose=require('mongoose')
const Product= require('./models/productModel')
const app= express();

app.use(express.json())

mongoose.connect('mongodb+srv://lcviduranga456:nekjyW-nehvot-dakce9@nodeapi.ki84ang.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected mongodb')
    app.listen(3000,()=>{
        console.log("Node API Project run in port 3000")
    })
}).catch(()=>{
    console.log(error)
})

// Routes 

//Create a New Product in Database
app.post('/product',async (req,res)=>{
    try {
        const product= await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
});

// Get data From Database
app.get('/product', async (req,res)=>{
    try {
        const products= await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

// Get data Using product id
app.get('/product/:id', async (req,res)=>{
    try {
        const {id}=req.params;
        const products=await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

// Update And Edit data using ID
app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        
        if (!product) {
            return res.status(404).json({ message: `Cannot find product with ID: ${id}` });
        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

// Remove or Delete From DataBase
app.delete('/product/:id',async(req,res)=>{
    try {
        const {id}= req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message:'cannot Find Product id with : ${id}'});
        }
        const products= await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
})
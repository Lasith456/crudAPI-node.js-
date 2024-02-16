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
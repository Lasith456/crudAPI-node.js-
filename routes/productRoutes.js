const express=require('express')
const router=express.Router();
const Product= require('../models/productModel')

//Create a New Product in Database
router.post('/',async (req,res)=>{
    try {
        const product= await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
});

// Get data From Database
router.get('/', async (req,res)=>{
    try {
        const products= await Product.find({});
        res.status(200).json(products)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
    }
})

// Get data Using product id
router.get('/:id', async (req,res)=>{
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
router.put('/:id', async (req, res) => {
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
router.delete('/:id',async(req,res)=>{
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

module.exports=router;
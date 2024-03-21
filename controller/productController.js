const Product= require('../models/productModel')
const asyncHandler = require('express-async-handler')

//Create a New Product in Database
const createProduct = asyncHandler(async (req,res)=>{
        try {
            const product= await Product.create(req.body);
            res.status(200).json(product);
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })

// Get data From Database
const getProducts = asyncHandler (async (req,res)=>{
        try {
            const products= await Product.find({});
            res.status(200).json(products)
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })

// Get data Using product id
const getProduct = asyncHandler(async (req,res)=>{
        try {
            const {id}=req.params;
            const products=await Product.findById(id);
            res.status(200).json(products);
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    })

// Update And Edit data using ID
const updateProduct = asyncHandler(async (req, res) => {
        try {
            const { id } = req.params;
            const product = await Product.findByIdAndUpdate(id, req.body);
            
            if (!product) {
                res.status(404);
                throw new Error('cannot Find Product id with : ${id}');
            }
    
            const updatedProduct = await Product.findById(id);
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    }
)
// Remove or Delete From DataBase
const deleteProduct =asyncHandler(async(req,res)=>{
        try {
            const {id}= req.params;
            const product = await Product.findByIdAndDelete(id);
            if(!product){
                res.status(404);
            throw new Error('cannot Find Product id with : ${id}');
            }
            const products= await Product.find({});
            res.status(200).json(products)
        } catch (error) {
            res.status(500);
            throw new Error(error.message);
        }
    }
)

module.exports={
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
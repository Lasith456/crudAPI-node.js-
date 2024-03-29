const Product= require('../models/productModel')

//Create a New Product in Database
const createProduct = async (req,res)=>{
        try {
            const product= await Product.create(req.body);
            res.status(200).json(product);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message:error.message})
        }
    }

// Get data From Database
const getProducts = async (req,res)=>{
        try {
            const products= await Product.find({});
            res.status(200).json(products)
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message:error.message})
        }
    }

// Get data Using product id
const getProduct = async (req,res)=>{
        try {
            const {id}=req.params;
            const products=await Product.findById(id);
            res.status(200).json(products);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({message:error.message})
        }
    }

// Update And Edit data using ID
const updateProduct = async (req, res) => {
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
    }

// Remove or Delete From DataBase
const deleteProduct = async(req,res)=>{
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
    }


module.exports={
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct
}
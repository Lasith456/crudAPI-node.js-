const express=require('express')
const router=express.Router();
const {createProduct,getProducts,getProduct,updateProduct,deleteProduct}= require('../controller/productController');

//Create a New Product in Database
router.post('/',createProduct);

// Get data From Database
router.get('/', getProducts)

// Get data Using product id
router.get('/:id', getProduct)

// Update And Edit data using ID
router.put('/:id', updateProduct);

// Remove or Delete From DataBase
router.delete('/:id',deleteProduct)


module.exports=router;
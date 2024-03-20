require('dotenv').config();
const { error } = require('console');
const express=require('express')
const mongoose=require('mongoose')
const app= express();
const productRoutes= require('./routes/productRoutes');

app.use('/api/product',productRoutes);
app.use(express.json())
const MONGO_URL=process.env.MONGO_URL;
const PORT=process.env.PORT || 2999;
mongoose.connect(MONGO_URL)
.then(()=>{
    console.log('connected mongodb')
    app.listen(PORT,()=>{
        console.log("Node API Project run in port "+PORT)
    })
}).catch(()=>{
    console.log(error)
})

// Routes 


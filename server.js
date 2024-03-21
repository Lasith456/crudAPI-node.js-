require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const errorMiddleware = require('./middleware/errorMiddleware');
const productRoutes = require('./routes/productRoutes');
const cors = require('cors');

const app = express();
app.use(cors());



// Place the JSON parsing middleware before defining routes
app.use(express.json());

// Register the routes
app.use('/api/product', productRoutes);



// Route handler for the root path
app.get('/', (req, res) => {
    throw new Error('fake error');
});

// Error handling middleware
app.use(errorMiddleware);

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 2999;

mongoose.connect(MONGO_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log("Node API Project running on port " + PORT);
        });
    })
    .catch((error) => {
        console.log(error);
    });

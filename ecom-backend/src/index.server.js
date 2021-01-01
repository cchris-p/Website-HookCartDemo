const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
var cors = require('cors');


var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
}

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');

// environment variable
env.config();

// mongodb connection | user: root, pass: admin
mongoose.connect('mongodb://localhost/hookcart', { 
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true });
mongoose.connection.once('open', function(){
    console.log('Database connected...');
}).on('error', function(error){
    console.log('Connection error: ', error);
})

app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.header('Allow-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept, Authorization');
//     if(req.method === 'OPTIONS') {
//         res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
//         return res.status(200).json({});
//     }
// })

app.use(express.json())
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);



app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})
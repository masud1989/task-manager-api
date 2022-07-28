// Basic Library Import 
const express = require('express');
const app = new express();
const router = require('./src/routes/api');
const bodyParser = require('body-parser');

// Security Middleware Library Import 
const rateLimit = require('express-rate-limit');
const helmet = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');

// Database Library Import 
const mongoose = require('mongoose');

// Security Middleware Library Implement
app.use(cors());
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());
app.use(hpp());
app.use(bodyParser.json())

// Body-Parser Implement 
app.use(bodyParser.json());

//Request Rate Limit
const limiter = rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter);

// MongoDB Database Connection
const URI = 'mongodb://127.0.0.1:27017/task';
const OPTION = {autoIndex:true};

mongoose.connect(URI, OPTION, (error)=>{
    console.log('DB Connection is Successful')
    console.log(error);
});

//Routing Implement
app.use('/api/v1', router);

//Undefined Route Implement
app.use('*', (req, res)=>{
    res.status(404).json({status:'fail', data:'URL Not Found'})
});

//Export app
module.exports = app;

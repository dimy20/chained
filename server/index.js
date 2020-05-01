const express = require('express');
const app = express();
const cors  = require('cors');
const pool = require('./db');
const morgan = require('morgan');
const BodyParser = require('body-parser');
const mongoose = require('mongoose');

//database connection
const mongodbConnection = mongoose.connect('mongodb+srv://dimy:D1myCs89%3F02@cluster0-xadxx.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser : true,
useUnifiedTopology: true });

mongodbConnection
.then(()=>{
    console.log('connected to database');
})
.catch((err)=>{
    console.log('connection to database failed :' + err.message);
})

// importing routes
const descriptionsRoute = require('./api/routes/descriptions');
const UserRoute = require('./api/routes/User');

app.use(cors());
app.use(morgan('dev'));
app.use(BodyParser.urlencoded({
    extended : false
}));
app.use(BodyParser.json());

app.use('/descriptions',descriptionsRoute);
app.use('/user',UserRoute);
// if we reach this line, it means none of the previous routes was able to handle the request
// so we can set up a middleware with a not found error
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});
// this middleware handles errors thrown from anywhere in the app
app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message,
        }
    });
})
module.exports = app;
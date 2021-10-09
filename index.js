require('dotenv').config({
    path:"config/.env",
});
//packages required
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const {connectMongo} = require("./config/database");
const {mongoURI} = require("./config/database");
const UserSchema = require('./api/models/Users');
const SummarySchema = require('./api/models/Summary');
const summary = require('./routes/summary')
const user = require('./routes/user')

const app= express();

app.use(bodyParser.urlencoded({
    extended: true
}));

var corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    optionsSuccessStatus: 200,
};

// middleware to verify the logged in user by checking for token
function validateUser(req,res,next){
    jwt.verify(req.cookies.token,'secretKey', function(err,decoded){
        if(err){
            res.json({ code: 0, status: 'error', message: err.message, data: null});
        }
        else{
            req.body.userId = decoded.id;
            userModel.findById(decoded.id,function(err, userInfo){
                if(err){
                    console.log();(err);
                    next();
                }
                else{
                    req.body.userEmail = userInfo.email;
                    next();
                }
            });
        }
    });
}

app.use('/user', user);
app.use('/summarise',validateUser, summary);


console.log("=> Connecting to MongoDB Atlas ...");
connectMongo(mongoURI).then((connection)=>{
    //making models
    global.userModel = connection.model('User', UserSchema);
    global.summaryModel = connection.model('User', SummarySchema);

    console.log("=> MongoDB Connected !!");

    connection.on('error', function(err){
        if(err)
        console.log(err);
    });

    app.listen(4000,function(){
        console.log("Local Man listening on Port 4000");
    });

});
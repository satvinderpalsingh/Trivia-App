const express = require('express');
const mongoose = require("mongoose");  
const app = express();
const PORT = 3000;
require("dotenv").config(); 
const dbURI = process.env.db_connect
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const cors = require("cors");
app.use(cors());
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const authRoutes = require('./routes/authRoutes')
const questionsRoutes = require('./routes/questionsRoutes')


mongoose.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    console.log("connected to db")
})
.catch(err=>{
    console.log(err);
});
app.get('/',(req,res,next)=>{
    res.status(200).send("Trivia Quiz Application running successfully")
})
  

app.use(authRoutes);
app.use(questionsRoutes);
app.listen(PORT, (error) =>{
    if(!error)
        console.log("Server is Successfully Running,and App is listening on port "+ PORT)
    else{
        console.log("Error occured, server can't start", error);
    }
});
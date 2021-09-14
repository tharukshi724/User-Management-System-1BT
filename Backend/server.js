const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");


const app = express();
require("dotenv").config();



app.use(bodyParser.json());
app.use(cors);

mongoose.connect(URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopologyL:true,
    useFindAndModify:false

})

const connection = mongoose.connection;

connection.once("open",() => {
            
       console.log("mongo db connection success");
});



const userRoute = require("./routes/registrationRoute.js");
app.use("/user",userRoute);



const PORT = process.env.PORT || 8080;
app.listen(PORT,() => {
    console.log("SERVER IS RUNNNING ON ${PORT}");
})



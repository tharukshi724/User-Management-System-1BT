
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const data = require("./dbcon/connection");








app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());

// mongoose.connect("mongodb+srv://root:root@cluster0.fucgx.mongodb.net/1bt_db?retryWrites=true&w=majority",{
//     useNewUrlParser:true,useCreateIndex:true

// });

mongoose.connect("mongodb+srv://root:root@cluster0.fucgx.mongodb.net/1bt_db?retryWrites=true&w=majority",
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

const connection = mongoose.connection;

connection.once('open',() => {
            
       console.log("mongo db connection success");
});



const userRoute = require("./routes/registrationRoute.js");
app.use("/user",userRoute);




app.listen(3000,(err) => {
    
    if(err){
        console.log(err);
    }
    else{
        console.log(`Connected to port ${data.port}`)
    }
})




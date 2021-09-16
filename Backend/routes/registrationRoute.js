const router = require("express").Router();
const { request } = require("express");
let registerUser = require("../model/registration");

router.route("/addUser").post((req,res)=>{

    const firstname = req.body.firstname;
    console.log(firstname);
    const lastname = req.body.lastname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new registerUser({
        firstname,
        lastname,
        username,
        email,
        password
    })

   

    newUser.save().then((res)=>{
        res.json("new user added");
    }).catch((err)=>{
        res.json(err);
    })
})

router.route("/login").get((req,res)=>{

    try{
        const username = req.body.username;
        const password = req.body.password;

       const uname = user.findOne({username:username});
       

       if(uname.password === password){
           res.status(201).render("index");
       }
       else{
           res.send("password not matching");
       }

    }catch(error){
          res.status(400).send("Invalid username");
    }
})

module.exports = router;
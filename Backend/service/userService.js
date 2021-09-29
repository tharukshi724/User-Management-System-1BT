let registerUser = require("../model/registration");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const user = require("../model/registration");

const transporter = nodemailer.createTransport(
    {
         service:"gmail",
         auth:{
             user:"mernstackhelp123@gmail.com",
             pass:"mernstack"

         }
    }
)

//validation

const Joi = require("@hapi/joi");
const schema ={
    firstname:Joi.string().min(6).required(),
    lastname:Joi.string().min(6).required(),
    username:Joi.string().min(6).required(),
    email:Joi.string().min(6).required().email(),
    password:Joi.string().min(6).required()


}
const schema1 ={
    
    username:Joi.string().min(6).required(),
    password:Joi.string().min(6).required()


}

exports.registeraUser = async(req,res)=>{

    const {error} = Joi.validate(req.body,schema);
    if(error) return res.status(400).send(error.details[0].message);

     
          const firstname = req.body.firstname;
          const lastname = req.body.lastname;
          const username = req.body.username;
          const email = req.body.email;
          const password = req.body.password;

          const checkUsername = await registerUser.findOne({
              username:req.body.username
          })

          const checkEmail = await registerUser.findOne({
              email:req.body.email
          })

          if(!checkUsername){
                if(!checkEmail){

                   const newUser = new registerUser({
                        firstname,
                        lastname,
                        username,
                        email,
                        password
                  })
            
            
            
                   await newUser.save().then(()=>{

                       res.json("new user added");

                   }).catch((err)=>{
                       res.json(err);
                   })
            }
             else{
            
                  return res.status(200).json({
                     error:"email already exists"
                  })
             }
          }
          else{
            
                  return res.status(200).json({
                    error:"username already exists"
                })
             }
         
       
          }

        

        
   
 

         



exports.login = async(req,res) =>{

    const {error} = Joi.validate(req.body,schema1);
    if(error) return res.status(400).send(error.details[0].message);

   
        const username = req.body.username;
        const password = req.body.password;
        console.log(password);

        const uname = await registerUser.findOne({username:username});
        console.log(username);
        console.log("uname"+uname.password);

         if(uname.password === password){
                console.log("xxx")
              res.status(201).send("success");
         }
         else{
              res.send("password not matching");
         }

   
}


exports.resetPassword = async(req,res) =>{
   try{
         const generateToken = await crypto.randomBytes(32)
         const token = generateToken.toString("hex")
        //     (err,buffer)=>{
        //   if(err){
        //     console.log(err);
        //   }
        //   const token = buffer.toString("hex");
        console.log(token)

     const result = await registerUser.findOne({
                email:req.body.email
           })
           console.log(result);
           if(!result){
               return res.status(422).json({
                   error:"email doesnot exists"
               })
           }
        //    .then(user=>{
        //     if(!user){
        //         return res.status(422).json({
        //             error:"email doesnot exists"
        //         })

              
        //     }
        //     user.resetToken = token;
        //     user.expireToken = Date.now() + 360000
        //     user.save().then(()=>{
        //         transporter.sendMail({
        //             to:user.email,
        //             from:"mernstackhelp123@gmail.com",
        //             subject:"Reset your password",
        //             html:`
        //             <p>You requested for password reset</p>
        //             <h5>click in this <a href="http://localhost:3000/reset/${token}"> link</a> to reset password`
        //         })
        //         res.json({
        //             message:"check your email"
        //         })
        //     }).catch((err)=>{
        //         res.status(400).send(err);
        //     })
        // })
   // })

}catch(error){
    res.status(400).send(err);
}
}

exports.createNewPassword=(req,res)=>{

      const newPassword = req.body.password;
      const sentToken = req.body.token;

    user.findOne({
        resetToken:sentToken,
        expireToken:{$gt:Date.now()}
    }).then(user=>{
        if(!user){
            return res.status(422).json({
                error:"Try again session expired"
            })
        }
        user.password = newPassword;
        user.resetToken=undefined;
        user.expireToken=undefined;
         user.save().then(()=>{
            res.json({
                message:"password updated success"
            })
        })
    })
}


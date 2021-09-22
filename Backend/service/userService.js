
let registerUser = require("../model/registration");
const nodemailer = require("nodemailer");

//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
const crypto = require("crypto");
const user = require("../model/registration");


const transporter = nodemailer.createTransport(
    {
         service:"gmail",
         auth:{
             user:"tharukshiw@gmail.com",
             pass:"Tharukshi",

         }
    }
)


 exports.registeraUser =async(req,res)=>{
     
    const firstname = req.body.firstname;
 
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

   
    console.log("xxx");
   await newUser.save().then(()=>{
        res.json("new user added");
    }).catch((err)=>{
        res.json(err);
    })
}

exports.login = async(req,res) =>{
    try{
        const username = req.body.username;
        const password = req.body.password;
      

       const uname = await registerUser.findOne({username:username});
    

       if(username.password === password){
        console.log(username.password);
           res.status(201).render("index");
       }
       else{
           res.send("password not matching");
       }

    }catch(error){
          res.status(400).send("Invalid username");
    }
}

exports.resetPassword = (req,res) =>{
try{
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err);
        }
        const token = buffer.toString("hex");
        registerUser.findOne({
            email:req.body.email
        }).then(user=>{
            if(!user){
                return res.status(422).json({
                    error:"email doesnot exists"
                })

              
            }
            user.resetToken = token;
            user.expireToken = Date.now() + 360000
           await user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"softwaredevep12@gmail.com",
                    subject:"Reset your password",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="http://localhost:3000/reset/${token}"> link</a> to reset password`
                })
                res.json({
                    message:"check your email"
                })
            }).catch((err)=>{
                
            })
        })
    })

}catch(error){
    res.status(400).send(err);
}
}

exports.createNewPassword=async(req,res)=>{
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
      await user.save().then((saveduser)=>{
            res.json({
                message:"password updated success"
            })
        })
    })
}


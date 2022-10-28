const User = require('../models/user');
const {body, validationResult} = require("express-validator");
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signin = (req,res,next)=>{
    const email=req.body.email;
    const password =req.body.password;
    let loadeduser;
    User.findOne({email:email})
    .then(user =>{
        if(!user){
            const error = new Error("Email was not found ");
            error.statusCode = 401;
            throw error
        }
        loadeduser=user;
        return bycrypt.compare(password,user.password)
    })
    .then(isEqual =>{
        if(!isEqual){
            const error = new Error("Password was not found ");
            error.statusCode = 401;
            throw error
        }
        const token = jwt.sign ({
            email:loadeduser.email,
            userId :loadeduser._id.toString(),
            categorys:loadeduser.categorys.toString()
        },'Somesupersecret')
         return res.status(200).json({
            token:token,
            Userid:loadeduser._id.toString(),

        });
        
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.signup =(req,res,next)=>{
    const errors =  validationResult(req);
    let pass;
    if(!errors.isEmpty()){
        const error = new Error("Validation Error");
        error.statusCode = 422;
        throw error
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const comfirmpassword=req.body.comfirmpassword
    return bycrypt.hash(password,12)
    .then(hashedpass =>{
        pass=hashedpass
        return bycrypt.hash(comfirmpassword,12)
    }).then(hashcomfirmpassword =>{
        const user = new User({
            email:email,
            password:pass,
            name:name,
            comfirmpassword:hashcomfirmpassword
        })
        return user.save()
    })
    .then(result =>{
        return res.status(201).json({
            message:"User created",
            userId:result._id
        });
    })
}
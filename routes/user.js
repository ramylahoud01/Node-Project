const express = require('express');
const router = express.Router();
const routecontroller = require('../controller/user');
const {body}= require('express-validator/check');
const User = require('../models/user')
//signin 
router.post('/signin',routecontroller.signin)

//signup
router.put('/signup',
[
    body('email').isEmail().withMessage("Please enter a valid email")
    .custom((value,{req})=>{
        return User.findOne({email:value}).then(userdoc =>{
            if(userdoc){
                return Promise.reject('E-mail already excits')
            }
        })
    }) 
    .normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('comfirmpassword').custom((value,{req})=>{
        if(value!=req.body.password){
            throw new Error("Password have to match")
        }
        return true
    }),
    body('name').trim().not().isEmpty()
]
,routecontroller.signup)


module.exports = router
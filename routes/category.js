const express = require('express');
const router = express.Router();
const categorycontroller = require('../controller/category')
const {body}= require('express-validator/check');
const isAuth = require('../middleware/is-auth');

//create
router.post('/post',isAuth,[
    body('name').trim().isLength({min:3})
    ]
,categorycontroller.createcategory);

//read some dummy data 
router.get('/posts',isAuth,categorycontroller.getcategory);

//update
router.put('/post/:categId',isAuth,[
    body('name').trim().isLength({min:3})
    ],categorycontroller.updatecategory);

//delete
router.delete('/post/:categId',isAuth,categorycontroller.deletecategory);

//post =>FetchOnePost
router.get('/post/:categId',isAuth,categorycontroller.getsinglecategory);

module.exports = router
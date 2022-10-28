const {body, validationResult} = require("express-validator");
const Category = require('../models/category');
const User = require('../models/user');
const Note = require('../models/notes')


//post
exports.createcategory = (req,res,next)=>{
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Validation error");
        error.statusCode = 422;
        throw error
    }
    let creator;
    const name = req.body.name;
    const category = new Category({
            name:name,
            UserId:req.userId
    })
    category
    .save()
    .then((result)=>{
        return User.findById(req.userId)
    })
    .then(user =>{
        creator=user
        user.categorys.push(category);
        return user.save()
    })
    .then(result =>{
        res.status(200).json({
        message:"Post create succefully",
        Category :{
        Name:category.name,
        Id:category._id
        },
        Creator:creator.name
        })
    })
    .catch(err =>{
    const error = new Error("Canot save to mongodb");
    error.statusCode = 422;
    throw error
    }) 
}




//get
exports.getcategory =(req,res,next)=>{
    res.status(200)
    .json({
        name:"Eb5",
        createdAt: new Date(),
        creator:{
            name:"Ramy"
        }
    })
}

//update 
exports.updatecategory =(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error("Canot save to mongodb");
        error.statusCode = 422;
        throw error
    }
    const categId = req.params.categId;
    const name=req.body.name;
    Category.findById(categId)
    .then(category =>{
        if(!category){
            const error = new Error("Cannot find the id ");
            error.statusCode = 422;
            throw error
        }
        category.name=name;
        return category.save()
    })
    .then(result =>{
        if(!result){
            console.log("Cannot save")
        }
        res.status(200).json({
            message:"Post updated",
            NewCategoryName:result.name,
            UpdatedAt:new Date()
        })
    })
    .catch(err =>{
        const error = new Error("Cannot update to mongodb");
            error.statusCode = 422;
            throw error
    })
}
//delete 
exports.deletecategory=(req,res,next)=>{
    const categId=req.params.categId
    Category.findById(categId)
    .then(category =>{
        if(!category){
            const error = new Error("Cannot find the id");
            error.statusCode = 422;
            throw error
        }
        return Category.findByIdAndRemove(categId)
    })
    .then(result =>{
        return User.findById(req.userId)
    })
    .then(user =>{
        user.categorys.pull(categId);
        return user.save();
    })
    .then(result =>{
        return res.status(200).json({
            Category:"Deleted"
        })
    })
    .catch(err=>{
        const error = new Error("Cannot Delete");
        error.statusCode = 422;
        throw error
    })
}

exports.getsinglecategory =(req,res,next)=>{
    const categId=req.params.categId
     Category.findById(categId)
     .then(category =>{
        if(!category){
            const error = new Error("Cannot find the id ");
            error.statusCode = 422;
            throw error
        }
        res.status(200).json({
            category :{
            CategoryName:category.name,
            CategoryId:category._id
            }
        })
     })
     .catch(err =>{
        const error = new Error("cannot fetch ");
        error.statusCode = 422;
        throw error
     })
}
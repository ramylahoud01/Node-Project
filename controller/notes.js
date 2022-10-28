const {body, validationResult} = require("express-validator");
const Notes = require('../models/notes')
const Category = require('../models/category')
const User = require('../models/user')

//post
exports.createnotes = (req,res,next)=>{
    const errors =  validationResult(req);
    if(!errors.isEmpty()){
       const error = new Error("validation failed ,Enter all data");
       error.statusCode = 422;
       throw error
    }
    let noteloaded;
    const categId = req.params.categId
    const title = req.body.title;
    const content = req.body.content;
    const tags =req.body.tags;
    const note = new Notes ({
        title:title,
        content:content,
        tags:tags,
        categories:categId
    })
    note.save()
    .then(result =>{
        noteloaded=result
        return Category.findById(categId)
        })
        .then(category =>{
            res.status(201).json({
                category:category,
                notes :{
                Id:noteloaded._id,
                title:noteloaded.title,
                content:noteloaded.content,
                tags:noteloaded.tags,
                }
            })
        })
        .catch(err =>{
            const error = new Error("Canot Create Note");
            error.statusCode = 422;
            throw error
            }) 
 
}

//get
exports.getnotes =(req,res,next)=>{
    const postId =req.params.postId;
    const categId = req.params.categId
    let noteloaded ;
    Notes.findById(postId)
    .then(note =>{
        if(!note){
            const error = new Error("Cannot find the id ");
            error.statusCode = 422;
            throw error
        }
        noteloaded=note
        return Category.findById(categId)
    })
    .then(category =>{
        return res.status(200).json({
            category:category,
            notes :{
                Id:noteloaded._id,
                title:noteloaded.title,
                content:noteloaded.content,
                tags:noteloaded.tags,
            }

        })
    })
    .catch(err =>{
        const error = new Error("Canot Get Note");
            error.statusCode = 422;
            throw error
    })
}

//update 
exports.updatenotes =(req,res,next)=>{
    const title = req.body.title;
    const content = req.body.content;
    const tags=req.body.tags;
    const postId =req.params.postId;
    const categId = req.params.categId
    let noteloaded;
    let categoryloaded;
    Notes.findById(postId)
    .then(note =>{
        if(!note){
            const error = new Error("Cannot find the id ");
            error.statusCode = 422;
            throw error
        }
        noteloaded = note
        return Category.findById(categId)
    })
    .then(category =>{
        categoryloaded=category
        noteloaded.title = title;
        noteloaded.content=content;
        noteloaded.tags=tags;
        return noteloaded.save();
    }).then(result =>{
        if(!result){
            const error = new Error("not saved to mongo ");
            error.statusCode = 422;
            throw error
        }
        res.status(200).json({
            message:"updated",
            notes :{
                Id:noteloaded._id,
                title:noteloaded.title,
                content:noteloaded.content,
                tags:noteloaded.tags,
            },
            category:categoryloaded,
            UpdatedAt:new Date()
        })
    })
    .catch(err =>{
        const error = new Error("Canot update Note");
            error.statusCode = 422;
            throw error
    })
}

//delete 
exports.deletenotes=(req,res,next)=>{
    const postId= req.params.postId
    const categId=req.params.categId
    Notes.findById(postId)
    .then(note=>{
        if(!note){
            const error = new Error("not find the id");
            error.statusCode = 422;
            throw error
        }
        return Category.findById(categId)
    })
    .then(category =>{
        return Notes.findByIdAndRemove(postId)
    })
    .then(result =>{
        return res.status(200).json({message:"Deleted"})
    })
    .catch(err =>{
        const error = new Error("Canot Delete");
            error.statusCode = 422;
            throw error
    })
}

//search tags
exports.searchtags = (req,res,next)=>{
const tags = req.body.tags;
Notes.find({tags:tags})
.then(note=>{
    if(!note){
    const error = new Error("Cannot fin match tags");
    error.statusCode = 422;
    throw error
    }
   return res.status(201).json({
    SearchTags:note
})
})
.catch(err =>{
    const error = new Error("Canot Search");
        error.statusCode = 422;
        throw error
})
}
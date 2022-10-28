const express = require('express')
const app = express();
const bodyparser = require('body-parser');
const userroutes = require('./routes/user');
const categoryroutes = require('./routes/category');
const notesroutes = require('./routes/notes');
const mongoose = require('mongoose');


app.use(bodyparser.json());
app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE')
    res.setHeader('Access-Control-Allow-Headers','Content-type , Authorization')
    next();
})


app.use('/user',userroutes);
app.use('/category',categoryroutes);
app.use('/notes',notesroutes);

mongoose.connect(
    'mongodb+srv://Ramy_lh:w2w0w0@atlascluster.xdeoggk.mongodb.net/NoteApp'
    ).then(result =>{
        console.log('Connected');
        app.listen(8083);
    }).catch(err =>{
        console.log(err)
    })

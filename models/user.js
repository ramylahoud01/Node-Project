const mongoose = require('mongoose');
const category = require('./category');
const schema = mongoose.Schema;

const userSchema = new schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    comfirmpassword:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    categorys:[{
        type:schema.Types.ObjectId,
        ref:'Category',
        required:false
    }]
},{timestamps:true})

module.exports = mongoose.model('User',userSchema);
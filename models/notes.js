const mongoose = require('mongoose');
const schema = mongoose.Schema;

const noteSchema = new schema({
    title:{
        type:String,
        required:true
    },
    content :{
        type:String,
        required:true
    },
    tags:{
        type:String,
        required:true
    },
    categories:{
        type:schema.Types.ObjectId,
        ref:'Category',
        required:false
    }
  

},{timestamps:true})

module.exports = mongoose.model('Note',noteSchema);
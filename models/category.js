const mongoose = require('mongoose');
const schema = mongoose.Schema;

const postSchema = new schema({
    name:{
        type:String,
        required:true
    },
    UserId:{
        type:schema.Types.ObjectId,
        ref:'User',
        required:false
    }
},{timestamps:true})

module.exports = mongoose.model('Category',postSchema)
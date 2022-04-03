const mongoose = require('mongoose');
const uniqueValidator = require ('mongoose-unique-validator');

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        required:true

    },
    post:{
        type:String,
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

adminSchema.plugin(uniqueValidator);

module.exports=mongoose.model('warehouse', adminSchema);
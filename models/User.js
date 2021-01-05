const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MakeUser = new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    servers:{
        type:Array,
        default:[]
    },
    id:{
        type:Date,
        default:Date.now().toString(),
        unique:true
    }
})

module.exports = mongoose.model("User", MakeUser)
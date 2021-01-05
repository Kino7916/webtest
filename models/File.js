const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MakeFile = new Schema({
    name:{
        type:String,
        default:"A Workspace"
    },
    code:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:"NORMAL"
    },
    id:{
        type:Number,
        required:true,
        unique:true
    },
    
})

module.exports = mongoose.model("Server", MakeServer)
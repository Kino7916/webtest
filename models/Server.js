const mongoose = require('mongoose')
const Schema = mongoose.Schema
const MakeServer = new Schema({
    name:{
        type:String,
        default:"A Workspace"
    },
    id:{
        type:Number,
        required:true,
        unique:true
    },
    files:[]
})

module.exports = mongoose.model("Server", MakeServer)
const express = require("express")
if(process.env.NODE_ENV !=='production') {
    require("dotenv").config()
}
const app = express()
const layouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const indexRouter = require("./routes/index")
const bodyparser = require("body-parser")
const session = require("express-session")
const flash = require("express-flash")
app.set("view engine", 'ejs')
app.set("views", __dirname+"/views")
app.use(layouts)
app.use(express.static("public"))
app.use(bodyparser.urlencoded({extended:false, limit:'10mb'}))
app.use(flash())
app.use(session({
    secret:process.env.SESSION_KEY,
    resave:false,
    saveUninitialized:false
}))

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true})
const db = mongoose.connection
db.on("error", err => console.error(err))
db.once('open', () => console.log("Connected to Database"))
app.use("/", indexRouter)

const listener = app.listen(process.env.PORT || 3000, () => console.log("Listening to "+listener.address().port))
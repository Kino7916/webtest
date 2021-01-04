const express = require("express")
const app = express()
const layouts = require("express-ejs-layouts")
const mongoose = require("mongoose")
const indexRouter = require("./routes/index")
app.set("view engine", 'ejs')
app.set("views", __dirname+"/views")
app.use(layouts)
app.use(express.static("public"))

mongoose.connect("mongodb://admin:NC93YQ78XXBM9BLE@194.146.44.170:1577/admin", {useNewUrlParser:true, useUnifiedTopology:true})
const db = mongoose.connection
db.on("error", err => console.error(err))
db.once('open', () => console.log("Connected to Database"))
app.use("/", indexRouter)

const listener = app.listen(process.env.PORT || 3000, () => console.log("Listening to "+listener.address().port))
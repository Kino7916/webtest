const express = require("express")
const router = express.Router()
//Models
const ApiRoutes = require("./api")

router.get("/", (req, res) => {
    res.render("index")
})
router.get("/login", (req, res) => {
    res.render("Authentication/login")
})
router.get("/register", (req, res) => {
    res.render("Authentication/register")
})
router.use("/api", ApiRoutes)
module.exports = router
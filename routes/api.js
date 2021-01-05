const express = require("express")
const router = express.Router()
//Models
const User = require("../models/User")
const Server = require("../models/Server")
const File = require("../models/File")
const bcrypt = require("bcrypt")

const passport = require("passport")
const initializePassport = require("../passport-config")

initializePassport(
    passport,
    email => User.find({email: new RegExp(email, 'i')})
    
    )

    router.use(passport.session())

//Creating Users
router.post("/user", async (req, res) => {
    if(!req.headers.authorization || req.headers.authorization !== process.env.AUTHORIZATION_KEY) {
        return res.status(401)
    }
    try{
    const hashedPass = await bcrypt.hash(req.body.password, 10)
        const Author = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPass,
            servers:[]
        })
        try{
            const searchOpt = {}
            searchOpt.email = new RegExp(req.body.email, 'i')
            if(await User.find(searchOpt)) return res.status(303)
        const newAuthor = await Author.save()
        return res.status(201)
        } catch {
            return res.status(500)
        }
    } catch {
        return res.status(500)
    }
    
})

router.post("/testing/user", async (req, res) => {
    try{
    const hashedPass = await bcrypt.hash(req.body.password, 10)
        const Author = new User({
            name:req.body.name,
            email:req.body.email,
            password:hashedPass,
            servers:[]
        })
        try{
            const searchOpt = {}
            searchOpt.email = new RegExp(req.body.email, 'i')
            if(await User.find(searchOpt)) return res.status(303)
        const newAuthor = await Author.save()
        return res.status(201)
        } catch {
            return res.status(500)
        }
    } catch {
        return res.status(500)
    }
    
})

router.post("/testing/server", async (req, res) => {
    try{
        const id = Math.floor(Math.random()*1234567890)
    const Servers = new Server({
        name:req.body.name,
        id:Date.now().toString()
    })
    try{
        User.findOneAndUpdate({email:req.body.email}, {$push:{servers:id}})
        const newServer = Servers.save()
        return res.status(201)
    } catch {
        return res.status(500)
    }
    } catch {
        return res.status(500)
    }
    
})

//Creating Servers
router.post("/server", async (req, res) => {
    if(!req.headers.authorization || req.headers.authorization !== process.env.AUTHORIZATION_KEY) {
        return res.status(401)
    }
    try{
        const id = Math.floor(Math.random()*1234567890)
    const Servers = new Server({
        name:req.body.name,
        id:Date.now().toString()
    })
    try{
        User.findOneAndUpdate({email:req.body.email}, {$push:{servers:id}})
        const newServer = Servers.save()
        return res.status(201)
    } catch {
        return res.status(500)
    }
    } catch {
        return res.status(500)
    }
    
})

router.delete("/testing/server", (req, res) => {
    try{
        
    await Server.findOneAndDelete({id: req.body.id})
        return res.status(200)
    } catch {
        return res.status(500)
    }
})

router.delete("/server", (req, res) => {
    if(!req.headers.authorization || req.headers.authorization !== process.env.AUTHORIZATION_KEY) {
        return res.status(401)
    }
    try{
        
    await Server.findOneAndDelete({id: req.body.id})
        return res.status(200)
    } catch {
        return res.status(500)
    }
})

router.patch("/testing/server", (req, res) => {
    try{
        
    await Server.findOneAndUpdate({id: req.body.id}, {$set:{name:req.body.name, mongodb:req.body.mongodb}})
        return res.status(200)
    } catch {
        return res.status(500)
    }
})

router.patch("/server", (req, res) => {
    if(!req.headers.authorization || req.headers.authorization !== process.env.AUTHORIZATION_KEY) {
        return res.status(401)
    }
    try{
        
    await Server.findOneAndUpdate({id: req.body.id}, {$set:{name:req.body.name, mongodb:req.body.mongodb}})
        return res.status(200)
    } catch {
        return res.status(500)
    }
})
module.exports = router
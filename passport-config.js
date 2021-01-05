const LocalStrategy = require("passport-local").Strategy
const bcrypt = require("bcrypt")

function initialize(passport, getUserByEmail) {
    const authenticateUser = (email, password, done) => {
        const user = getUserByEmail(email)
        if(!user) {
            return done(null, false, {message:"No Account with that email was found"})
        }
        try{
        if(await bcrypt.compare(password, user.password)) {
            return done(null, user)
        } else {
            return done(null, false, {message: "Password Incorrect"})
        }
        } catch(err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'email'}), authenticateUser)

    passport.serializeUser((user, done) => {  })
    passport.deserializeUser((user, done) => {  })
}

module.exports = initialize
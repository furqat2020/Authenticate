const express = require('express'),
layout = require('express-ejs-layouts'),
bodyParser = require('body-parser'),
flash = require('connect-flash'),
cookieParser = require('cookie-parser'),
session = require('express-session'),
mongoose = require('mongoose'),
validatorEx = require('express-validator'),
passport = require('passport'),
app = express()

const home_router = require('./routes/homeRouter'),
user_router = require('./routes/userRouter')

mongoose.connect("mongodb://localhost/flash", {useUnifiedTopology:true, useNewUrlParser:true})
mongoose.Promise = global.Promise
mongoose.connection.once('open', () => {
   console.log("Baza bilan ulandi. Baza nomi: flash")
})

const User = require('./models/userModel')
passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 1300)

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(validatorEx())
app.use(express.static("public"))
app.use(cookieParser("sir"))
app.use(session({
    secret: 'hufiya',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365
    },
    resave: false,
    saveUninitialized: false
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    res.locals.xabar = req.flash()
    res.locals.loggedIn = req.isAuthenticated()
    res.locals.currentUser = req.user
    next()
})

app.use(layout)

app.use(home_router)
app.use(user_router)

app.listen(app.get('port'), () => {
    console.log(`Server ishga tushdi. Port: ${app.get('port')}`)
})
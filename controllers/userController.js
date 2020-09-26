const passport = require("passport"),
User = require('../models/userModel')

let createUser = (body) => {
    var user = new User()
    user.name = body.name
    user.email = body.email
    user.password = body.password

    return user
}

module.exports = {
    show_user: (req, res, next) => {
        var id = req.params.id
        User.findById({_id:id})
        .then(data => {
            res.render("user/user", {data:data})
            next()
        })
        .catch(error => {
            console.log(error)
            res.locals.redirect = "/login_user"
            req.flash("error", "Hotolik bo'ldi...")
        })
    },

    show_signup: (req, res) => {
        res.render('user/add_user')
    },

    add_user: (req, res, next) => {

        if(req.skip) next()

        let user = createUser(req.body)

        User.register(user, req.body.password, (error, userr) => {
            if(userr){
                req.flash("success", `${userr.name} ismli account muvofaqiyatli yaratildi.`)
                res.locals.redirect = "/"
                next()
            } else {
                req.flash("error", `Account yaratilmadi. Sababi ${error.message} xatolik bo'ldi.`)
                res.locals.redirect = "/add_user"
                next()
            }
        })


        // User.create(user)
        // .then(data => {
        //     req.flash("success", `${data.name} ismli account muvofaqiyatli yaratildi.`)
        //     res.locals.redirect = "/"
        //     //res.locals.user = data
        //     next()
        // })
        // .catch(error => {
        //     console.error(error.message)
        //     res.locals.redirect = "/add_user"
        //     req.flash("error", `Account yaratilmadi. Sababi ${error.message} xatolik bo'ldi.`)
        //     next()
        // })
    },

    show_login: (req, res) => {
        res.render("user/log_in")
    },

    auth: passport.authenticate("local", {
        failureRedirect: "/login_user",
        failureFlash: "Xatolik bo'ldi",
        successRedirect: "/",
        successFlash: "Login muvofaqiyatli bo'ldi."
    }),

    // auth: (req, res, next) => {
    //     User.findOne({email:req.body.email})
    //     .then(user => {

    //         if(user) {
    //             user.passwordComparison(req.body.password)
    //             .then(passwordmatch => {
    //                 if(passwordmatch){
    //                     res.locals.redirect = `/user/${user._id}`
    //                     req.flash("success", `${user.name} muvofaqiyatli login bo'ldi.`)
    //                     res.locals.user = user 
    //             } else {
    //                 req.flash("error", "email yoki parol xato, iltimos qaytadan urunib ko'ring...")
    //                 res.locals.redirect = "/login_user"
    //             }     
    //                 next()              
    //             })
    //         } else {
    //             req.flash("error", " bunday foydalanuvchi yo'q")
    //             res.locals.redirect = "/login_user"
    //             next()
    //         }
    //     })
    //     .catch(error => {
    //         console.log(error.message)
    //         next(error)
    //     })
    // },

    validate: (req, res, next) => {
        req.sanitizeBody("email").normalizeEmail({
            all_lowercase: true
        }).trim()

        req.check("email", "email xato").isEmail()
        req.check("password", "parol min: 5ta belgi").notEmpty().isLength({min:5})

        req.getValidationResult()
        .then(error => {
            if(!error.isEmpty()){
                let messages = error.array().map(e => e.msg)
                req.skip = true
                req.flash("error", messages.join(", "))
                res.locals.redirect = "/add_user"
                next()
            } else {
                next()
            }
        })
    },

    logout: (req, res, next) => {
        req.logout()

        req.flash("success", "User logout bo'ldi")
        res.locals.redirect = "/"
        next()
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect
        if (redirectPath)
            res.redirect(redirectPath)
        else 
            next()
    }
}
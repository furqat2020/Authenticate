const mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
passportLocalMongoose = require('passport-local-mongoose'),
{Schema} = mongoose

let userSchema = new Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true}
})

userSchema.plugin(passportLocalMongoose, {usernameField: "email"})

// userSchema.pre("save", function(next){
//     let user = this

//     bcrypt.hash(user.password, 10)
//     .then(hash => {
//         user.password = hash
//         next()
//     })
//     .catch(error => {
//         console.log(`Parolni hash-lashda hatolik bo'ldi. ${error.message}`)
//         next(error)
//     })
// })

// userSchema.methods.passwordComparison = function(inputPassword){
//     let user = this

//     return bcrypt.compare(inputPassword, user.password)
// }

module.exports = mongoose.model('User', userSchema)
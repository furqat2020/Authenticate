const express = require('express'),
user_router = express.Router()

const userController = require('../controllers/userController')

user_router.get('/add_user', userController.show_signup)
user_router.post('/add_user', userController.validate, userController.add_user, userController.redirectView)
user_router.get('/login_user', userController.show_login)
user_router.post('/login_user', userController.auth)
user_router.get('/user/:id', userController.show_user, userController.redirectView)

user_router.get('/logout', userController.logout, userController.redirectView)

module.exports = user_router
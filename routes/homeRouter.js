const express = require('express'),
home_router = express.Router()

const homeController = require('../controllers/homeController')

home_router.get('/', homeController.show_home)

module.exports = home_router
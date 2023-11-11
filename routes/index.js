const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller') ;
// const user = require('./users');
console.log('my router is loaded');

router.get('/', homeController.home);
router.use('/users', require('./users'));

module.exports = router;
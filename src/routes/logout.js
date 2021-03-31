//REQUIRES 
const express = require('express');
const controllers = require('../controllers/logout');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');


// INITIALIZATIONS 
const router = express.Router();


router.route('/pms/logout')
    .get(isLoggedIn, controllers.logout)


module.exports = router;
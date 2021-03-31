const express = require('express');
const router = express.Router();
const controllers = require('../controllers/signin');
const helpers = require('../lib/encriptacion');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');


router.route('/')

    .get(isNotLoggedIn, controllers.signinGet)
    .post(isNotLoggedIn, controllers.signinPost)




module.exports = router; 

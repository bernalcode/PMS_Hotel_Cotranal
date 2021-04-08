const express = require('express');
const router = express.Router();
const controllers = require('../controllers/turno');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');





router.route('/pms/turno')

    .get(isLoggedIn, controllers.entregarTurno)



module.exports = router;
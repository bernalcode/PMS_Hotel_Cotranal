const express = require('express');
const router = express.Router();
const controllers = require('../controllers/pisos');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');



router.route('/pms/pisos')
    .get(isLoggedIn, controllers.indexPisos)


router.route('1-piso')
    .get(isLoggedIn, controllers.piso1)
    
router.route('2-piso')
    .get(isLoggedIn, controllers.piso1)

router.route('3-piso')
    .get(isLoggedIn, controllers.piso1)

router.route('4-piso')
    .get(isLoggedIn, controllers.piso1)

router.route('5-piso')
    .get(isLoggedIn, controllers.piso1)









module.exports = router;
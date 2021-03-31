const express = require('express');
const router = express.Router();
const controllers = require('../controllers/admin');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');
//const {isAdm Admin } = require('../lib/helps');


//RUTAS <<GET>>
router.route('/pms/admin')

    .get(isLoggedIn, isAdmin, controllers.indexAdmin)

router.route('/pms/usuarios-pms')

    .get(isLoggedIn, isAdmin, controllers.usersPms)

router.route('/pms/borrar-user/:id')

    .get(isLoggedIn, isAdmin, controllers.deleteUser)

router.route('/pms/signup')

    .get(isLoggedIn, isAdmin, controllers.signupUsersPmsGet)
    .post(isLoggedIn, isAdmin, controllers.signupUsersPmsPost)
    


router.route('/pms/reset-password/:id')
    .get(isLoggedIn, isAdmin, controllers.resetPassword)



    
    
    


// RUTAS <<POST>>
//.post('/admin-signin', controllers.redirect)



module.exports = router; 
//REQUIRES 
const express = require('express');
const controllers = require('../controllers/clientes');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');


// INITIALIZATIONS 
const router = express.Router();
 


// -- ENRUTADOR -- 

router.route('/pms/fetch')
    .get(isLoggedIn, controllers.buscar_real_time)




router.route('/pms/registrar-cliente')

    .get(isLoggedIn, controllers.getSignupCliente)
    .post(isLoggedIn, controllers.postSignupClient)
    

router.route('/pms/clientes')

    .get(isLoggedIn, controllers.getClientes)


router.route('/pms/ver-cliente/:id')

    .get(isLoggedIn, controllers.seeClient)


router.route('/pms/borrar-cliente/:id')

    .get(isLoggedIn, controllers.deleteClient)


router.route('/pms/editar/:id')

    .post(isLoggedIn, controllers.editarCliente);




module.exports = router;
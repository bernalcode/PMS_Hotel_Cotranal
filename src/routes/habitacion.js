//REQUIRES
const express = require('express');
const controllers = require('../controllers/habitacion');
const pool = require('../database');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');

//INITIALIZATIONS
const router = express.Router();




// -- ENRUTADOR --

//--------------- BUSCADOR HABITACIONES 'REAL-TIME' ------------

router.route('/pms/fetch_habitaciones')

    .get(isLoggedIn, controllers.buscar_habitaciones)



//----------------------------------------------

//--------------- NUEVA HABITACION ------------

router.route('/pms/nu-habitacion')

    .get(isLoggedIn, controllers.newRoomGet)
    .post(controllers.newRoomPost)

//----------------------------------------------


router.route('/pms/nu-habitacion-tipo/:id')

    .get(isLoggedIn, controllers.newRoomOfTyperoomsGet)
    .post(controllers.newRoomOfTyperoomsPost)


router.route('/pms/tipo-habitacion')

    .get(isLoggedIn, controllers.allTypesRooms)
    .post(controllers.newTypeRoom)


router.route('/pms/editar-habitacion-ocupada/:id')

    .get(isLoggedIn, controllers.editOccupiedRoom)


router.route('/pms/borrar-tipo/:id')

    .get(isLoggedIn, controllers.deleteTypeRoom)


router.route('/pms/tiposs/:id')

    .get(isLoggedIn, controllers.seeTypesRooms)



//-------  TODAS LAS HABITACIONES -------------

router.route('/pms/prueba')

    .get(isLoggedIn, controllers.allRooms)

//---------------------------------------------            

router.route('/pms/borrar-habi/:id')

    .get(isLoggedIn, controllers.deleteRoom)


router.route('/pms/borrar-habit/:id')

    .get(isLoggedIn, controllers.deleteRoomOfTyperooms)


router.route('/pms/editar-habitacion-desocupada/:id')

    .get(isLoggedIn, controllers.editVacantRoom)



router.route('/pms/editar-habitacion/:id')
    .post(isLoggedIn, controllers.editRoom);  



module.exports = router;
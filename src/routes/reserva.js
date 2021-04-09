
const express = require('express');
const router = express.Router();
const controllers = require('../controllers/reserva');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');


//RUTAS  << GET >>

router.route('/pms/fetch_reserva_web')
    .get(isLoggedIn, controllers.buscar_reservas_web)

router.route('/pms/fetch_reserva')
    .get(isLoggedIn, controllers.buscar_real_time)

router.route('/pms/ver_reserva_web/:id')

    .get(isLoggedIn, controllers.ver_reserva_web)

router.route('/pms/reserva_web')
    .get(isLoggedIn, controllers.reserva_Web)


router.route('/pms/park/:id')

    .get(isLoggedIn, controllers.parkGet)
    .post(isLoggedIn, controllers.parkPost)


//router.route('/pms/park/')



router.route('/pms/borrar-reserva/:id')

    .get(isLoggedIn, controllers.deleteReserve)


router.route('/pms/reserva')

    .get(isLoggedIn, controllers.createReserve)
    .post(isLoggedIn, controllers.saveReserve);


router.route('/pms/todas-reservas')

    .get(isLoggedIn, controllers.allReserve)


router.route('/pms/ver-reserva/:id')

    .get(isLoggedIn, controllers.oneReserve)



router.route('/pms/observacion/:id')

    .post(isLoggedIn, controllers.observations)






module.exports = router;
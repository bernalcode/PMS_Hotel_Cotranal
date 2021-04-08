const sql = require('../database');

module.exports = {


    //ENTREGAR TURNO

    entregarTurno(req, res) {
        res.render('turno/turno.hbs');
    }



}
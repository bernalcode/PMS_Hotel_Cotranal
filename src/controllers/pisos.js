const sql = require('../database');



module.exports = {

    indexPisos(req, res) {
        res.render('habitaciones/pisos.hbs');
    },

    async piso1(req, res) {
        var abitacion = await sql.query('SELECT id_habitacion, numero_habitacion, descripcion, precio_habitacion FROM habitacion, tipo_habitacion WHERE tipo_habitacion = id_tipo_habitacion ORDER BY numero_habitacion;');
    var ar = [];
    for (var z = 0; z < abitacion.length; z++) {
        if (abitacion[z].numero_habitacion == '101') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '102') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '103') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '104') {
            ar[z] = abitacion[z];
        }
    };
    habitacion = ar;
    res.render('habitaciones/1-piso.hbs', { habitacion });

    },

    async piso2(req, res){
        var abitacion = await sql.query('SELECT id_habitacion, numero_habitacion, descripcion, precio_habitacion FROM habitacion, tipo_habitacion WHERE tipo_habitacion = id_tipo_habitacion ORDER BY numero_habitacion;');
    var ar = [];
    for (var z = 0; z < abitacion.length; z++) {
        if (abitacion[z].numero_habitacion == '201') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '202') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '203') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '204') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '205') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '206') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '207') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '208') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '209') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '210') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '211') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '212') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '213') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '214') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '215') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '216') { 
            ar[z] = abitacion[z];
        }
    };
    habitacion = ar;
    res.render('habitaciones/1-piso.hbs', { habitacion });
    },

    async piso3(req, res){
        var abitacion = await sql.query('SELECT id_habitacion, numero_habitacion, descripcion, precio_habitacion FROM habitacion, tipo_habitacion WHERE tipo_habitacion = id_tipo_habitacion ORDER BY numero_habitacion;');
    var ar = [];
    for (var z = 0; z < abitacion.length; z++) {
        if (abitacion[z].numero_habitacion == '301') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '302') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '303') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '304') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '305') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '306') {
            ar[z] = abitacion[z];
        }
    };
    habitacion = ar;
    res.render('habitaciones/3-piso.hbs', { habitacion });
    },

    async piso4(req, res){
        var abitacion = await sql.query('SELECT id_habitacion, numero_habitacion, descripcion, precio_habitacion FROM habitacion, tipo_habitacion WHERE tipo_habitacion = id_tipo_habitacion ORDER BY numero_habitacion;');
    var ar = [];
    for (var z = 0; z < abitacion.length; z++) {
        if (abitacion[z].numero_habitacion == '401') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '402') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '403') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '404') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '405') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '406') {
            ar[z] = abitacion[z];
        }
    };
    habitacion = ar;
    res.render('habitaciones/4-piso.hbs', { habitacion });
    },

    async piso5(req, res){
        var abitacion = await sql.query('SELECT id_habitacion, numero_habitacion, descripcion, precio_habitacion FROM habitacion, tipo_habitacion WHERE tipo_habitacion = id_tipo_habitacion ORDER BY numero_habitacion;');
    var ar = [];
    for (var z = 0; z < abitacion.length; z++) {
        if (abitacion[z].numero_habitacion == '501') {
            ar[z] = abitacion[z];

        }
        if (abitacion[z].numero_habitacion == '502') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '503') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '504') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '505') {
            ar[z] = abitacion[z];
        }
        if (abitacion[z].numero_habitacion == '506') {
            ar[z] = abitacion[z];
        }
    };
    habitacion = ar;
    res.render('habitaciones/5-piso.hbs', { habitacion });
    },


}
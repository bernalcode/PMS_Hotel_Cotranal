const sql = require('../database');



module.exports = {

    //EDITAR HABITACION SI ESTA OCUPADA [GET]
    editOccupiedRoom(req, res) {
        res.render('habitaciones/habitacion-ocupada.hbs');
    },

    // BORRAR TIPO DE HABITACION [GET]
    async deleteTypeRoom(req, res) {
        const { id } = req.params;
        try {
            await sql.query('DELETE FROM tipo_habitacion WHERE id_tipo_habitacion = ?', [id]);
        } catch (e) {
            req.flash('message', 'No se puede Borrar, Contiene Registros !');
            var t = '/tiposs/';
            var i = t + id;
            res.redirect(i);
        }
        req.flash('success', 'Tipo de Habitacion Borrada con Exito');
        res.redirect('/pms/tipo-habitacion');
    },

    // VER UN TIPO DE HABITACIONES  [GET]
    async seeTypesRooms(req, res) {
        const { id } = req.params;
        const habi = await sql.query('SELECT * FROM habitacion WHERE tipo_habitacion = ?', [id]);
        const tip = await sql.query('SELECT * FROM tipo_habitacion WHERE id_tipo_habitacion = ?', [id]);
        const tipo = tip[0];
        res.render('habitaciones/tip-habi.hbs', { habi, tipo, id });
    },

    // VER TODAS LAS HABITACIONES DE LA BASE DE DATOS [GET]
    async allRooms(req, res) {
        var habitacion = await sql.query('SELECT id_habitacion, numero_habitacion, estado, descripcion, precio_habitacion FROM habitacion, tipo_habitacion WHERE tipo_habitacion = id_tipo_habitacion ORDER BY numero_habitacion;');
        for (let i = 0; i < habitacion.length; i++) {
            habitacion[i].persona = false;
        };
        var datos = await sql.query('SELECT numero_habitacion, nombre, apellido, id_reserva FROM habitacion, cliente LEFT OUTER JOIN nueva_reserva ON cliente.id = nueva_reserva.id_cliente where nueva_reserva.id_habitacion = habitacion.id_habitacion;');
        for (var i = 0; i < habitacion.length; i++) {
            var num = habitacion[i].numero_habitacion;
            for (var j = 0; j < datos.length; j++) {
                if (num == datos[j].numero_habitacion) {
                    habitacion[i].persona = true;
                };
            };
        };
        res.render('habitaciones/prueba.hbs', { habitacion });
    },

    // VER TODOS LOS TIPOS DE HABITACIONES  [GET]
    async allTypesRooms(req, res) {
        const habitacion = await sql.query('SELECT * FROM tipo_habitacion');
        res.render('habitaciones/tipo-habitacion.hbs', { habitacion });
    },

    // AGREGAR UNA NUEVA HABITACION [GET]
    async newRoomGet(req, res) {
        const habitacion = await sql.query('SELECT id_tipo_habitacion, descripcion FROM tipo_habitacion');
        var habi = habitacion[0];
        res.render('habitaciones/nueva-habitacion.hbs', { habi, habitacion });
    },
    // CREAR/REGISTRAR UNA NUEVA HABITACION  [POST]
    async newRoomPost(req, res) {
        const { numero_habitacion, id_tipo_habitacion, estado } = req.body;
        var tipo_habitacion = id_tipo_habitacion;
        const datos_habitacion = {
            numero_habitacion,
            tipo_habitacion,
            estado
        };
        await sql.query('INSERT INTO habitacion SET ?', [datos_habitacion]);
        req.flash('success', 'Habitacion Registrada con Exito');
        res.redirect('/pms/prueba');
    },

    // AGREGAR UN NUEVA HABITACION DESDE EL TIPO CORRESPONDIENTE  [GET]
    async newRoomOfTyperoomsGet(req, res) {
        const { id } = req.params;
        const habitacion = await sql.query('SELECT id_tipo_habitacion, descripcion FROM tipo_habitacion');
        var habi = habitacion[0];
        res.render('habitaciones/nu-habitacion-tipo.hbs', { habi, habitacion, id });
    },

    // BORRAR LA HABITACION DE LA BASE DE DATOS  [GET]
    async deleteRoom(req, res) {
        const { id } = req.params;
        await sql.query('DELETE FROM habitacion WHERE id_habitacion = ?', [id]);
        req.flash('success', 'Habitacion Borrada con Exito');
        res.redirect('/pms/prueba');
    },

    // BORRAR LA HABITACION DESDE TIPOS DE HABITACION  [GET]
    async deleteRoomOfTyperooms(req, res) {
        const { id } = req.params;
        await sql.query('DELETE FROM habitacion WHERE id_habitacion = ?', [id]);
        req.flash('success', 'Habitacion Borrada con Exito');
        res.redirect('/pms/tipo-habitacion');
    },

    // EDITAR HABITACION DESOCUPADA  [GET]
    async editVacantRoom(req, res) {
        const { id } = req.params;
        //CONSULTAS A LA BASE DE DATOS
        const datos = await sql.query('SELECT id_habitacion, id_tipo_habitacion, numero_habitacion, descripcion, estado FROM habitacion, tipo_habitacion WHERE tipo_habitacion = id_tipo_habitacion AND id_habitacion = ?', [id]);
        const tipo = await sql.query('SELECT * FROM tipo_habitacion');
        //DESTRUCTURAR LISTAS
        const dato = datos[0];
        var ide = dato.id_tipo_habitacion;
        var select = dato.descripcion;
        for (var i = 0; i < tipo.length; i++) {
            //DESTRUCURAR LA LISTA
            var objeto = tipo[i]

            if (ide == objeto.id_tipo_habitacion) {
                var removeItemFromArr = (arr, item) => {
                    var i = arr.indexOf(item);
                    i !== -1 && arr.splice(i, 1);
                };
                removeItemFromArr(tipo, objeto);
                var newTipo = tipo;
            };
        };
        var esta = ['Limpia', 'En Limpieza', 'Mantenimien'];
        if (dato.estado == 'Limpia' || dato.estado == 'En Limpieza' || dato.estado == 'Mantenimien') {
            var removeItemFromArr = (arr, item) => {
                var i = arr.indexOf(item);
                i !== -1 && arr.splice(i, 1);
            };
            removeItemFromArr(esta, dato.estado);
        }
        var std = dato.estado;
        res.render('habitaciones/editar-habitacion.hbs', { dato, newTipo, select, std, esta });
    },


    // CREAR/REGISTRAR UN NUEVO TIPO DE HABITACION [POST]
    async newTypeRoom(req, res) {
        const { descripcion, precio_habitacion } = req.body;
        const datosTipo = {
            descripcion,
            precio_habitacion
        };
        await sql.query('INSERT INTO tipo_habitacion SET ?', [datosTipo]);
        req.flash('success', 'llego juan');
        res.redirect('/pms/tipo-habitacion');
    },



    // AGREGAR UN NUEVA HABITACION DESDE EL TIPO CORRESPONDIENTE  [GET]
    async newRoomOfTyperoomsPost(req, res) {
        const { id } = req.params;
        const { numero_habitacion } = req.body;
        var tipo_habitacion = id;
        const datos_habitacion = {
            numero_habitacion,
            tipo_habitacion
        };
        await sql.query('INSERT INTO habitacion SET ?', [datos_habitacion]);
        req.flash('success', 'Habitacion Registrada con Exito');
        var t = '/pms/tiposs/';
        var url = t + id;
        res.redirect(url);
    },


    async editRoom(req, res) {
        const { id } = req.params;
        const { numero_habitacion, id_tipo_habitacion, estado } = req.body;
        const tipo_habitacion = id_tipo_habitacion;
        const datos = {
            numero_habitacion,
            tipo_habitacion,
            estado
        };
        await sql.query('UPDATE habitacion SET ? WHERE id_habitacion = ?', [datos, id]);
        req.flash('success', 'Habitacion Editada con Exito');
        res.redirect('/pms/prueba');
    }










}
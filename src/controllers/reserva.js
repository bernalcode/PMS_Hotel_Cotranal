
const sql = require('../database');


module.exports = {
    
    // BUSCAR REAL TIME ----------------------------------------------------------
    async buscar_reservas_web(req, res) {
        var db = await sql.query('SELECT * FROM reserva_web ORDER BY id DESC');
        res.json(db);
    },

    async buscar_real_time(req, res) {
        var db = await sql.query('SELECT numero_habitacion, nombre, apellido, numero_documento, id_reserva FROM habitacion, cliente LEFT OUTER JOIN nueva_reserva ON cliente.id = nueva_reserva.id_cliente where nueva_reserva.id_habitacion = habitacion.id_habitacion ORDER BY id_reserva DESC');
        res.json(db);
    },
    //----------------------------------------------------------




    // PARQUEADERO CARROS  [GET] ----------------------------------------------------------
    async parkGet(req, res) {
        const {id} = req.params;
        const park = await sql.query('SELECT * FROM parking WHERE id_reserva = ?', [id]);
        
        if (park.length >  0) {
            const {placa} = park[0];
            console.error('ya tiene parqueadero');
            res.render('reserva/park_true.hbs', {placa});

        } else {
            
            console.error('no tiene parqueadero registrado');
            res.render('reserva/park_false.hbs', {id});
        }
        
    },//_________________________________________________________________________________

    
    // PARQUEADERO CARROS  [POST] ----------------------------------------------------------
    async parkPost(req, res) {
        const {park} = req.body;
        const placa = park;
        const {id} = req.params;
        const id_reserva = id;
        const {username} = req.user;
        const db = {
            placa,
            id_reserva,
            username
        };
        
        await sql.query('INSERT INTO parking SET ?', [db]);
        req.flash('success', 'Parqueadero regustrado con Exito!');
        res.redirect('/pms/todas-reservas');
    },//_________________________________________________________________________________



    // BORRAR LA RESERVA  [GET] ----------------------------------------------------------
    async deleteReserve(req, res) {
        const { id } = req.params;
        await sql.query('DELETE FROM nueva_reserva WHERE id_reserva = ?', [id]);
        req.flash('success', 'Reserva Eliminada con Exito');
        res.redirect('/pms/todas-reservas'); 
    },//_________________________________________________________________________________



    // CREAR NUEVA RESERVA  [GET] ----------------------------------------------------------
    async createReserve(req, res) {
        const habitacion = await sql.query('SELECT * FROM habitacion;')
        const cliente = await sql.query('SELECT id, nombre, apellido FROM cliente;');
        const ocu = await sql.query('SELECT numero_habitacion, nombre, apellido, numero_documento, id_reserva FROM habitacion, cliente LEFT OUTER JOIN nueva_reserva ON cliente.id = nueva_reserva.id_cliente where nueva_reserva.id_habitacion = habitacion.id_habitacion;')
        const h = habitacion;
        const o = ocu;
        if (o.length == 0) {
            res.render('reserva/reserva.hbs', { habitacion, cliente, newHabita });
        } else {
            for (var j = 0; j < o.length; j++) {
                var oo = o[j];
                for (var i = 0; i < h.length; i++) {

                    var obj = h[i];
                    if (oo.numero_habitacion == obj.numero_habitacion) {
                        var removeItemFromArr = (arr, item) => {
                            var i = arr.indexOf(item);
                            i !== -1 && arr.splice(i, 1);
                        };
                        removeItemFromArr(h, obj);
                        var rrr = h;
                    }
                }
            };

            if (rrr.length == 0) {
                req.flash('message', 'No hay Habitaciones Disponibles');
                res.redirect('/pms/todas-reservas');
            } else {
                for (var j = 0; j < ocu.length; j++) {
                    var ocupa = ocu[j];
                    for (var i = 0; i < habitacion.length; i++) {

                        var objeto = habitacion[i];
                        if (ocupa.numero_habitacion == objeto.numero_habitacion) {
                            var removeItemFromArr = (arr, item) => {
                                var i = arr.indexOf(item);
                                i !== -1 && arr.splice(i, 1);
                            };
                            removeItemFromArr(habitacion, objeto);
                            var newHabita = habitacion;
                        }
                    }
                };
                res.render('reserva/reserva.hbs', { habitacion, cliente, newHabita });
            };
        }
    },//_________________________________________________________________________________



    // VER TODAS LA RESERVAS [GET] ----------------------------------------------------------
    async allReserve(req, res) {
        const datos = await sql.query('SELECT numero_habitacion, nombre, apellido, numero_documento, id_reserva FROM habitacion, cliente LEFT OUTER JOIN nueva_reserva ON cliente.id = nueva_reserva.id_cliente where nueva_reserva.id_habitacion = habitacion.id_habitacion ORDER BY id_reserva DESC');
        res.render('reserva/todas-reservas.hbs', { datos });
    },//_________________________________________________________________________________

    // VER TODAS LA RESERVAS  ADMIN  [GET] ----------------------------------------------------------
    async allReserve_admin(req, res) {
        const datos = await sql.query('SELECT numero_habitacion, nombre, apellido, numero_documento, id_reserva FROM habitacion, cliente LEFT OUTER JOIN nueva_reserva ON cliente.id = nueva_reserva.id_cliente where nueva_reserva.id_habitacion = habitacion.id_habitacion ORDER BY id_reserva DESC');
        res.render('reserva/todas-reservas-admin.hbs', { datos });
    },//_________________________________________________________________________________

    



    // VER UNA RESERVA ESPECIFICA [GET] ----------------------------------------------------------
    async oneReserve(req, res) {
        const { id } = req.params;
        const katos = await sql.query('SELECT id, numero_habitacion, nombre, apellido, id_reserva, check_in, check_out, adultos, ninos, observacion FROM habitacion, cliente LEFT OUTER JOIN nueva_reserva ON cliente.id = nueva_reserva.id_cliente where nueva_reserva.id_habitacion = habitacion.id_habitacion AND id_reserva = ?', [id]);
        const kato = katos[0];
        var chein = kato.check_in;
        var cheou = kato.check_out;

        //FECHA CHEK_IN

        var fech_y_in = chein.getFullYear();
        var fech_m_in = chein.getMonth() + 1;
        var fech_d_in = chein.getDate();
        if (fech_m_in < 10) {
            fech_m_in = '0' + fech_m_in;
        };
        if (fech_d_in < 10) {
            fech_d_in = '0' + fech_d_in;
        };
        const fecha_in = fech_d_in + '-' + fech_m_in + '-' + fech_y_in; 

        //FECHA CHECK_OUT

        var fech_y_ou = cheou.getFullYear();
        var fech_m_ou = cheou.getMonth() + 1;
        var fech_d_ou = cheou.getDate();
        var fech_d_ou_min = cheou.getDate();
        if (fech_m_ou < 10) {
            fech_m_ou = '0' + fech_m_ou;
        };
        if (fech_d_ou < 10) {
            fech_d_ou = '0' + fech_d_ou;
        };
        //fech_d_ou_min = parseInt(fech_d_ou_min) + 1;
        const fecha_out = fech_y_ou + '-' + fech_m_ou + '-' + fech_d_ou;
        const fecha_out_min = fech_y_ou + '-' + fech_m_ou + '-' + fech_d_ou_min;
        res.render('reserva/ver-reserva', { kato, fecha_in, fecha_out, id, fecha_out_min });
    },//_________________________________________________________________________________



    // GUARDAR OBSERVACIONES DEL CLIENTE/RESERVA [POST] ----------------------------------------------------------
    async observations(req, res) {
        const { id } = req.params;
        const { observacion, check_out } = req.body;
        
        const dato = {
            observacion,
            check_out
        };

        await sql.query('UPDATE nueva_reserva SET ? WHERE id_reserva = ?', [dato, id]);
        res.redirect('/pms/todas-reservas');
    },//_________________________________________________________________________________



    // MANDAR DATOS DE LA NUEVA RESERVA Y GUARDARLOS  [POST] ----------------------------------------------------------
    async saveReserve(req, res) {
        let { id_cliente, id_habitacion, check_in, check_out, adultos, ninos } = req.body;
        
        if (ninos == "" || ninos == null) {
            ninos = 0;
        }
        if (check_out == "" || check_out == null) {
            check_out = check_in;
        }

        var user_pms = req.user.username;
        const datos = {
            id_cliente,
            id_habitacion,
            check_in,
            check_out,
            adultos,
            ninos,
            user_pms
        };
        console.log('1', req.body);
        console.log('2', req.params);
        console.log('3', req.user);
        await sql.query('INSERT INTO nueva_reserva SET ?', [datos])
        req.flash('success', 'Reserva Agregada Satisfactoriamente');
        res.redirect('/pms/todas-reservas'); 
    },//_________________________________________________________________________________



    //RESERVAS ENVIADAS DESDE LA PAGINA ----------------------------------------------------------

    async reserva_Web(req, res) { 
        const reserva_web = await sql.query('SELECT * FROM reserva_web ORDER BY id DESC');

        for (var i = 0; i < reserva_web.length; i++) {
            var reserva_we = reserva_web[i];
            var fech_y_in = reserva_we.check_in.getFullYear();
            var fech_m_in = reserva_we.check_in.getMonth() + 1;
            var fech_d_in = reserva_we.check_in.getDate();
            if (fech_m_in < 10) {
                fech_m_in = '0' + fech_m_in;
            };
            if (fech_d_in < 10) {
                fech_d_in = '0' + fech_d_in;
            };
            const fecha_in = fech_d_in + '-' + fech_m_in + '-' + fech_y_in;
            reserva_web[i].check_in = fecha_in;
            
        };

        for (var i = 0; i < reserva_web.length; i++) {
            var reserva_we = reserva_web[i];
            var fech_y_out = reserva_we.check_out.getFullYear();
            var fech_m_out = reserva_we.check_out.getMonth() + 1;
            var fech_d_out = reserva_we.check_out.getDate();
            if (fech_m_out < 10) {
                fech_m_out = '0' + fech_m_out;
            };
            if (fech_d_out < 10) {
                fech_d_out = '0' + fech_d_out;
            };
            const fecha_out = fech_d_out + '-' + fech_m_out + '-' + fech_y_out;
            reserva_web[i].check_out = fecha_out;            
        };

        res.render('reserva/reserva_web.hbs', { reserva_web });
    },//_________________________________________________________________________________



    // VER UNA UNICA RESERVA ENVIADA DESDE LA PAGINA DEL HOTEL ------------------------------

    async ver_reserva_web(req, res) {

        var {id} = req.params;
        var dbb = await sql.query('SELECT * FROM reserva_web WHERE id = ?',[id]);
        var db = dbb[0];
        

        ///////////////////// FORMATEAR FECHA CHECK_IN //////////////////
        var chein = db.check_in;
        var fech_y_in = chein.getFullYear();
        var fech_m_in = chein.getMonth() + 1;
        var fech_d_in = chein.getDate();
        if (fech_m_in < 10) {
            fech_m_in = '0' + fech_m_in;
        };
        if (fech_d_in < 10) {
            fech_d_in = '0' + fech_d_in;
        };
        const fecha_in = fech_d_in + '-' + fech_m_in + '-' + fech_y_in;
        db.check_in = fecha_in; 
        //////////////////////////////////////////////////////////////////

        
        ///////////////////// FORMATEAR FECHA CHECK_OUT //////////////////
        var cheou = db.check_out;
        var fech_y_ou = cheou.getFullYear();
        var fech_m_ou = cheou.getMonth() + 1;
        var fech_d_ou = cheou.getDate();
        if (fech_m_ou < 10) {
            fech_m_ou = '0' + fech_m_ou;
        };
        if (fech_d_ou < 10) {
            fech_d_ou = '0' + fech_d_ou;
        };
        const fecha_out = fech_d_ou + '-' + fech_m_ou + '-' + fech_y_ou;
        db.check_out = fecha_out;
        //////////////////////////////////////////////////////////////////


        res.render('reserva/reserva_web_all', {db});
    }





} // <-- fin del Module.exports ------------------------------
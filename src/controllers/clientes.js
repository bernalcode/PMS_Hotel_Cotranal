
const sql = require('../database');
const sql_copia = require('../database_copia');


module.exports = {

    // AUDITORIA A CLIENTES CREADOS
    async audi_clientes(req, res) { 

        //FECHA INICIO Y FECHA FINAL PARA LA BUSQUEDA
        var { fecha_ini, fecha_fin } = req.params


        fecha_ini = fecha_ini + ' 00:00:00';
        fecha_fin = fecha_fin + ' 23:59:59';

        var db = await sql.query('SELECT * FROM cliente WHERE created_at >= ? AND created_at <= ? ORDER BY created_at', [fecha_ini, fecha_fin]);

        db.map(function (e) {

            e.hora = e.created_at.getHours();
            e.minutos = e.created_at.getMinutes();
            e.meridiano = 'AM';

            if (e.hora > 12) {
                if (e.hora == 13) {
                    e.hora = 1;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 14) {
                    e.hora = 2;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 15) {
                    e.hora = 3;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 16) {
                    e.hora = 4;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 17) {
                    e.hora = 5;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 18) {
                    e.hora = 6;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 19) {
                    e.hora = 7;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 20) {
                    e.hora = 8;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 21) {
                    e.hora = 9;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 22) {
                    e.hora = 10;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora > 12) {
                if (e.hora == 23) {
                    e.hora = 11;
                    e.meridiano = 'PM';
                }
            }
            if (e.hora == 00) {

                e.hora = 12;
                e.meridiano = 'AM';

            }

            var YY = e.created_at.getFullYear();
            var MM = e.created_at.getMonth() + 1;
            var DD = e.created_at.getDate();
            var DS = e.created_at.getDay();


            if (DS == 0) {
                DS = 'Domingo';
            }
            if (DS == 1) {
                DS = 'Lunes';
            }
            if (DS == 2) {
                DS = 'Martes';
            }
            if (DS == 3) {
                DS = 'Miercoles';
            }
            if (DS == 4) {
                DS = 'Jueves';
            }
            if (DS == 5) {
                DS = 'Viernes';
            }
            if (DS == 6) {
                DS = 'Sabado';
            }

            e.created_at = DS + ' : ' + DD + ' - ' + MM + ' - ' + YY;
        })

        res.json(db);
    },
    //_______________________________________________________________________________________


    // BUSCAR REAL TIME 
    async buscar_real_time(req, res) {
        var db = await sql.query('SELECT * FROM cliente ORDER BY id DESC');
        res.json(db);
    },

    // VER TODOS LOS CLIENTES REGISTRADOS EN LA BASE DE DATOS
    async getClientes(req, res) {
        const clientes = await sql.query('SELECT * FROM cliente ORDER BY id DESC');
        res.render('cliente/todos-clientes.hbs', { clientes });
    },

    //  FORMULARIO PARA REGISTRAR UN NUEVO CLIENTE
    getSignupCliente(req, res) {
        res.render('cliente/registrar-cliente.hbs');
    },

    // REGISTRAR CLIENTE EN LA BASE DE DATOS
    async postSignupClient(req, res) {
        var { username } = req.user;
        var usuario_pms = username;
        const { nombre,
            apellido,
            sexo,
            nacionalidad,
            tipo_documento,
            numero_documento,
            fecha_expedicion,
            lugar_expedicion,
            celular,
            correo
        } = req.body;

        const datosCliente = {
            nombre,
            apellido,
            sexo,
            nacionalidad,
            tipo_documento,
            numero_documento,
            fecha_expedicion,
            lugar_expedicion,
            celular,
            correo,
            usuario_pms
        };
        var volvio = await sql.query('INSERT INTO cliente SET ?', [datosCliente]);
        var id = volvio.insertId;
        await sql_copia.query('INSERT INTO pms_hotel_copia.cliente SELECT * FROM pms_hotel.cliente WHERE id = ?;', [id]);
        req.flash('success', 'Cliente Agregado Satisfactoriamente');
        res.redirect('/pms/clientes');
    },

    // VER TODOS LOS DATOS DEL CLIENTE
    async seeClient(req, res) {
        const { id } = req.params;
        const datos_cliente = await sql.query('SELECT * FROM cliente WHERE id = ?', [id]);
        const fecha = await sql.query('SELECT fecha_expedicion FROM cliente WHERE id = ?', [id]);
        var date = fecha[0].fecha_expedicion;
        var fech_y = date.getFullYear();
        var fech_m = date.getMonth() + 1;
        var fech_d = date.getDate();
        if (fech_m < 10) {
            fech_m = '0' + fech_m;
        };
        if (fech_d < 10) {
            fech_d = '0' + fech_d;
        };
        const fecha_final = fech_y + '-' + fech_m + '-' + fech_d;
        const cliente = datos_cliente[0];
        res.render('cliente/ver-cliente.hbs', { cliente, fecha_final });
    },

    // BORRAR EL CLIENTE DE LA BASE DE DATOS
    async deleteClient(req, res) {
        var { idd } = req.params;

        var volvio = await sql.query('DELETE FROM cliente WHERE id = ?', [idd]);
        if (volvio) {


            var llego = await sql_copia.query('SELECT * FROM cliente WHERE id = ?', [idd]);


            var sett = llego[0]
            const {
                id,
                nombre,
                apellido,
                sexo,
                nacionalidad,
                tipo_documento,
                numero_documento,
                fecha_expedicion,
                lugar_expedicion,
                celular,
                correo
            } = sett;
            await sql_copia.query(
                'INSERT INTO cliente_delete (id_delete, nombre, apellido, sexo, nacionalidad, tipo_documento, numero_documento, fecha_expedicion, lugar_expedicion, celular, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                id,
                nombre,
                apellido,
                sexo,
                nacionalidad,
                tipo_documento,
                numero_documento,
                fecha_expedicion,
                lugar_expedicion,
                celular,
                correo
            ]);





        }






        req.flash('success', 'Cliente Borrado con Exito');
        res.redirect('/pms/clientes');
    },

    // EDITAR DATOS DEL CLIENTE 
    async editarCliente(req, res) {
        const { id } = req.params;
        const { nombre,
            apellido,
            celular,
            sexo,
            correo,
            tipo_documento,
            fecha_expedicion,
            lugar_expedicion,
            numero_documento,
            nacionalidad
        } = req.body;

        const datos = {
            nombre,
            apellido,
            sexo,
            nacionalidad,
            tipo_documento,
            numero_documento,
            fecha_expedicion,
            lugar_expedicion,
            celular,
            correo
        };

        var volvio = await sql.query('UPDATE cliente SET ? WHERE id = ?', [datos, id]);
        if (volvio) {
            await sql_copia.query(
                'INSERT INTO cliente_updates (id_delete, nombre, apellido, sexo, nacionalidad, tipo_documento, numero_documento, fecha_expedicion, lugar_expedicion, celular, correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [
                id,
                nombre,
                apellido,
                sexo,
                nacionalidad,
                tipo_documento,
                numero_documento,
                fecha_expedicion,
                lugar_expedicion,
                celular,
                correo
            ]);
        }
        //await sql_copia.query('INSERT INTO cliente_actualizado SET ?', [datos_copia]);
        req.flash('success', 'Cliente Editado con Exito');
        res.redirect('/pms/clientes');
    }







}





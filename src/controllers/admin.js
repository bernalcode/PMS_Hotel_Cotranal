const sql = require('../database');
const sql_copia = require('../database_copia');
const helpers = require('../lib/encriptacion');


module.exports = {

    // INICIO PANEL ADMIN
    indexAdmin(req, res) {

        res.render('admin/admin.hbs');
    },

    // ADMIN AUDITORIA
    async traer_reservas(req, res) {

        //FECHA INICIO Y FECHA FINAL PARA LA BUSQUEDA
        var { fecha_ini, fecha_fin } = req.params


        fecha_ini = fecha_ini + ' 00:00:00';
        fecha_fin = fecha_fin + ' 23:59:59';

        var db = await sql.query('SELECT * FROM nueva_reserva WHERE created_at >= ? AND created_at <= ? ORDER BY created_at', [fecha_ini, fecha_fin]);

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


    admin_auditoria(req, res) {
        res.render('admin/admin_auditoria.hbs');
    },

    admin_reservas(req, res) {
        res.render('admin/admin_reservas.hbs');
    },

    async auditoria_clientes_creados(req, res) {
        res.render('admin/auditoria/clientes_creados.hbs')
    },

    async auditoria_reservas_creadas(req, res) {
        res.render('admin/auditoria/reservas_creadas.hbs')
    },

    db_PMS_creados(req, res) {
        res.render('admin/auditoria/db_PMS.hbs')
    },





    // VER TODOS LOS USUARIOS DEL PMS REGISTRADOS
    async usersPms(req, res) {
        const todos = await sql.query('SELECT * FROM users;');

        for (var i = 0; i < todos.length; i++) {

            if (todos[i].tipo_usuario === 'admin') {

                todos[i].tipo_usuario = 'Administrador';
            } else if (todos[i].tipo_usuario === 'recep') {

                todos[i].tipo_usuario = 'Recepcionista'
            }
        };
        res.render('admin/usuarios-pms.hbs', { todos });
    },


    // BORRAR UN USUARIO DEL PMS --------------------
    async deleteUser(req, res) {
        const { id } = req.params;
        var user_pm = await sql.query('SELECT username FROM users WHERE id = ?', [id]);
        var user_pms = user_pm[0].username;
        var usee = req.user.username;
        if (user_pms == usee) {
            req.flash('message', 'Error!, El usuario tiene la sesion Activa "CONTACTE A OTRO ADMINISTRADOR...');
            res.redirect('/pms/usuarios-pms');

        } else {
            var accion_true = await sql.query('SELECT user_pms FROM nueva_reserva WHERE user_pms = ?', [user_pms]);
            if (accion_true.length == 0) {
                await sql.query('DELETE FROM users WHERE id = ?', [id]);
                req.flash('success', 'Usuario Eliminado con Exito !');
                res.redirect('/pms/usuarios-pms');
            }
            req.flash('message', 'ERROR!!\n El usuario tiene acciones en el Sistema !');
            res.redirect('/pms/usuarios-pms');
        }





    },

    // ---------------------------------------------------------------

    redirect(req, res) {
        res.redirect('/pms/todos-signup')
    },


    // REGISTRAR UN NUEVO USUARIO ----------------
    signupUsersPmsGet(req, res) {
        res.render('admin/registrar-usuario-pms.hbs');
    },


    // MANDAR DATOS POST A LA BASE DE DATOS Y CREAR  USUARIO ... -----------
    async signupUsersPmsPost(req, res) {

        var {
            fullname,
            tipo_usuario,
            username,
            password } = req.body;

        var usuario_tipo = 'false';

        if (tipo_usuario == 'admin') {
            usuario_tipo = 'true';
        }


        password = await helpers.encryptPassword(password);

        const newUser = {
            fullname,
            username,
            password,
            tipo_usuario,
            usuario_tipo
        };
        await sql.query('INSERT INTO users SET ?', [newUser]);
        req.flash('success', 'Usuario Registrado con exito');
        res.redirect('/pms/admin');
    },

    // ---------------------------------------------------------------
    async resetPassword(req, res) {
        const { id } = req.params;
        const userr = await sql.query('SELECT * FROM users WHERE id = ?', [id]);
        const user = userr[0];
        const password = user.username + '123';
        const newPass = await helpers.encryptPassword(password);
        await sql.query('UPDATE users SET password = ? WHERE id = ?', [newPass, id]);
        req.flash('success', 'Contraseña Reseteada!');
        res.redirect('/pms/usuarios-pms');
    }





};
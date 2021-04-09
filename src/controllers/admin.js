const sql = require('../database');
const sql_copia = require('../database_copia');
const helpers = require('../lib/encriptacion');


module.exports = {

    // INICIO PANEL ADMIN
    indexAdmin(req, res) {

        res.render('admin/admin.hbs');
    },

    // ADMIN AUDITORIA

    admin_auditoria(req, res) {
        res.render('admin/admin_auditoria.hbs');
    },

    async auditoria_clientes_creados(req, res) {
      res.render('admin/auditoria/clientes_creados.hbs')
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

    // BORRAR UN USUARIO DEL PMS
    async deleteUser(req, res) {
        const { id } = req.params;
        await sql.query('DELETE FROM users WHERE id = ?', [id]);
        req.flash('success', 'Usuario Eliminado con Exito !');
        res.redirect('/pms/todos-signup');
    },

    redirect(req, res) {
        res.redirect('/pms/todos-signup')
    },

    // REGISTRAR UN NUEVO USUARIO
    signupUsersPmsGet(req, res) {
        res.render('admin/registrar-usuario-pms.hbs');
    },

    // MANDAR DATOS POST A LA BASE DE DATOS Y CREAR  USUARIO ... 
    async signupUsersPmsPost(req, res) {

        var {
            fullname,
            tipo_usuario,
            username,
            password } = req.body;
        var usuario_tipo = 'true';
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
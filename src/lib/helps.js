const sql = require('../database');

module.exports = {
    async existe(req, res, next) {
        const { username } = req.body;
        const user = await sql.query('SELECT * FROM users WHERE username = ?', [username]);
        if (user.length > 0) {
            return next();
        } else {
            return res.redirect('/pms/nx');
        }
    },
    
    async isAdmin(req, res, next) {
        //se trabaja con el req.body
        var username = req.body.username;
        const use = await sql.query('SELECT * FROM users WHERE username = ?', [username]);
        if (use.length == 0) {
            var unx = true;
            res.redirect('/pms/x');
        } else {
            if (use.length > 0) {
                var user = use[0];
                var tipo = user.tipo_usuario;
                if (tipo === 'admin') {
                    var admin = true;
                } else {
                    var admin = false;
                }
                req.body.admin = admin;
            }
            return req.body, next();
        }
    },


    async Admin(req, res, next) {
        if (req.user.tipo_usuario === 'admin') {
            next();
        } else {
            return res.redirect('/pms/');
        }
    },

    async que(req, res, next) {
        const { username, password } = req.body;
        const dato = await sql.query('SELECT * FROM users WHERE username = ?',[username]);
        console.log(dato,'?]????]??');
        req.flash('message','hola');
        
        return next();
    }
    
}; 
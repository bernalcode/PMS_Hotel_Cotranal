const sql = require('../database');
const helpers = require('../lib/encriptacion');
const passport = require('passport');


module.exports = {

    // FORMULARIO LOGIN
    signinGet(req, res) {
        
        var bool = false;
        var message = 'juan';
        res.render('r.htm', { title:'PMS - Cotranal Hotel', message, bool });
    },

    // VALIDAR DATOS DEL LOGIN Y ENTRAR SI TRUE
    async signinPost(req, res) {
        var title = 'PMS - Cotranal Hotel';
        const { username, password } = req.body;
        const db = await sql.query('SELECT * FROM users WHERE username = ?', [username]);
        if (db.length == 0) {
            var bool = true;
            var message = 'Usuario no Existe !!';
            
            res.render('r.htm', { title, message, bool });
        } else {
            const user = db[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if (validPassword) {
                passport.authenticate('local.signin', {
                    successRedirect: '/pms/prueba', // si local.signin devuelve true
                    failureRedirect: '/pms/', // si local.signin devuelve false
                    failureFlash: false
                })(req, res);
            } else {
                var bool = true;
                var message = 'Contraseña incorrecta !!';
                res.render('r.htm', { title, message, bool });
            }
        }
    }

}
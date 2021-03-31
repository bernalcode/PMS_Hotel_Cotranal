const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const sql = require('../database');
const helpers = require('../lib/encriptacion');


// -------    <<<  local.signin  >>>

passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async function (req, username, password, done) {
    console.log('desde local.signin', username);


    const rows = await sql.query('SELECT * FROM users WHERE username =?', [username]);
    if (rows.length == 0) {
        req.flash('message', 'mal!');
        return done(null, false);
    } else {
        if (rows.length > 0) {
            const user = rows[0];
            const validPassword = await helpers.matchPassword(password, user.password);
            if (validPassword) {
                done(null, user, req.flash('success', 'Bienvenido ' + user.username));
            } else {
                done(null, false);
            }
        } else {
            return done(null, false);
        }
    }

}));


// -------    <<<  local.signup  >>>

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { fullname, tipo_usuario } = req.body;

    var usuario_tipo = 'true'

    const newUser = {
        fullname,
        username,
        password,
        tipo_usuario,
        usuario_tipo
    };
    newUser.password = await helpers.encryptPassword(password);
    const result = await sql.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    return done(null, newUser)
}));

// -------    <<<  SERIALIZAR USUARIO >>>

passport.serializeUser((user, done) => {
    done(null, user);
});


// -------    <<<  DESERIALIZAR USUARIO  >>>

passport.deserializeUser(async (user, done) => {
    const rows = await sql.query('SELECT * FROM users WHERE id = ?', [user.id]);
    done(null, rows[0]);
});
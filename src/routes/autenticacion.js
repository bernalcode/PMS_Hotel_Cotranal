const express = require('express');
const router = express.Router();
const passport = require('passport');
const sql = require('../database');
const helpers = require('../lib/encriptacion');
const controllers = require('../controllers/authenticacion');
const { isLoggedIn, isNotLoggedIn, isAdmin } = require('../lib/guardias');




router.route('/pms/change-password')

    .get(isLoggedIn, controllers.changePassword)

    .post(isLoggedIn, async (req, res) => {
        const { newPass } = req.body;
        const { username } = req.user;
        passEncrypt = await helpers.encryptPassword(newPass);
        await sql.query('UPDATE users SET password = ? WHERE username = ?', [passEncrypt, username]);
        req.flash('success', 'Contraseña Cambiada con Exito !')
        res.redirect('/pms/todas-reservas');
    });








module.exports = router;
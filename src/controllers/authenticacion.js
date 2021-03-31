const sql = require('../database');

module.exports = {

    changePassword(req, res) {
        res.render('admin/cambiar-password.hbs');
    }
}
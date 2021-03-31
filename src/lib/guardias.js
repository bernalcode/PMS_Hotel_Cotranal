module.exports = {


    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            
            return next();
        }
        
        return res.redirect('/pms/');
    },

    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        req.flash('message', 'Ruta incorrecta,\nTiene la sesion Abierta !');
        return res.redirect('/pms/prueba')
    },

    isAdmin(req, res, next) {
        if(req.user.tipo_usuario === 'admin') {
            return next();
        }
        return res.redirect('/pms/prueba')
    }

};
module.exports = {

    logout(req, res) {
        console.log('1');
        req.logOut();
        console.log('2');
        res.redirect('/pms/')
    }
}
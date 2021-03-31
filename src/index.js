///////////  ---------------------------------- REQUIRES ------------------------------------------ //////////


const express = require('express');
const morgan = require('morgan');
const path = require('path');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const { database } = require('./keys');
const flash = require('connect-flash');
const passport = require('passport');




///////////  ---------------------------------- INITIALIZATION ------------------------------------------ //////////


const app = express();
require('./lib/passport');



///////////  ---------------------------------- SETTINGS ------------------------------------------ //////////




app.set('port', process.env.PORT || 4000);              // Aqui se define el numero de puerto donde se Escucha
app.set('views', path.join(__dirname, 'views'));        // Direccion de la carpeta de vistas


app.engine('htm', require('ejs').renderFile)            // Motor de plantillas  << ejs >>          [configuraciones]
app.set('view engine', 'htm');                          // Se configura para llamar el Motor "ejs"


app.engine('.hbs', exphbs({                             // Motor de Plantillas << Handlebars >>   [configuraciones]
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));

app.set('view engine', '.hbs');                         // Se configura para llamar el Motor "Handlebars"







///////////  ---------------------------------- MIDDLEWARES ------------------------------------------ //////////



app.use(session({
    secret: 'pmsHotel',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());



///////////  ---------------------------------- GLOBAL VARIABLES ------------------------------------------ //////////



app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    if (req.user) {
        if (req.user.usuario_tipo == 'true') {
            req.user.usuario = true;



        } else {
            req.user.usuario = false;

        }
    }
    app.locals.user = req.user;

    next();
});


///////////  ---------------------------------- ROUTES ------------------------------------------ //////////

app.use(require('./routes/index'));
app.use(require('./routes/clientes'));
app.use(require('./routes/habitacion'));
app.use(require('./routes/reserva'));
app.use(require('./routes/pisos'));
app.use(require('./routes/autenticacion'));
app.use(require('./routes/admin'));
app.use('/pms',require('./routes/signin'));
app.use(require('./routes/logout'));



///////////  ---------------------------------- PUBLIC ------------------------------------------ //////////



app.use(express.static(path.join(__dirname, 'public')));



///////////  ---------------------------------- STARTING THE SERVER ------------------------------------------ //////////


app.listen(app.get('port'), () => {
    console.log('Servidor en el puerto:', app.get('port'));
});
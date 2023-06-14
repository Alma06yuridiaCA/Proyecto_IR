const express = require("express");
const routes = require ("./routes");
const path = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const expressLayouts = require('express-ejs-layouts');
const passport = require('./config/passport');


// Conexión a la base de datos
const db = require('./config/db');
require('./models/Usuarios');
require('./models/Articulos');





db.sync().then(() => console.log("Conexión a bd exitosa")).catch((error) => console.log(error));


// Variables de Desarrollo
require('dotenv').config({path:'variables.env'});

const app = express();

//Body parser, leer formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true }));


// Habilitar EJS como template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Ubicación vistas
app.set('views', path.join(__dirname, './views'));

//Archivos estaticos
app.use(express.static('public'));


// Habilitar cookie parser
app.use(cookieParser());

// Crear la session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave : false,
    saveUninitialized :  false
}));



// Iniciar passport
app.use(passport.initialize());
app.use(passport.session());



// Agrega flash message
app.use(flash());

//Middleware (usuario logueado, flash messages, fecha actual)
app.use((req, res, next) => {
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});


//Rutas de la app
app.use("/", routes());
// puerto 5000
app.listen(process.env.PORT, ()=> {
   
    console.log('Servidor corriendo en puerto 5000');
});
exports.autenticarUsuario = (req,res) => {
    console.log("Bienvenido")
}

const passport = require('passport');

exports.autenticarUsuario = passport.authenticate('local', {
    successRedirect: '/administracion',
    failureRedirect: '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

// revisar si el usuario esta autentificado o no
exports.usuarioAutenticado = (req, res, next) => {
    // Si el usuario está autenticado puede continuar
    if(req.isAuthenticated()) {
        return next();
    }

    // si no está autenticado
    return res.redirect('/iniciar-sesion');
}
const Usuarios = require("../models/Usuarios");
const enviarEmail = require('../handlers/emails');
const {validationResult, body} = require('express-validator');

exports.formCrearCuenta = (req, res) => {
    res.render("crear-cuenta",{
        nombrePagina: 'Crea tu cuenta'
    });
}

exports.crearNuevaCuenta = async (req, res, next) => {
    const usuario = req.body;
    console.log(usuario)
    const rules = [
        body('email').notEmpty().withMessage('Debes ingresar un email'),
        body('nombre').notEmpty().withMessage('Debes ingresar un nombre'),
        body('password').notEmpty().withMessage('Debes ingresar un password'),
        body('confirmar').notEmpty().withMessage('Debes de confirmar tu password'),
        body('confirmar').equals(req.body.password).withMessage('El password es diferente')
    ];
    await Promise.all(rules.map(validation => validation.run(req)))
    const erroresExpress = validationResult(req);

    try {
        validationResult(req).throw()
        const nuevoUsuario = await Usuarios.create(usuario);

         // Url de confirmaciones
         const url = `http://${req.headers.host}/confirmar-cuenta/${usuario.email}`;

         // Enviar email de confirmaciones
         await enviarEmail.enviarEmail({
             usuario,
             url,
             subject: 'Confirma tu cuenta de Meeti',
             archivo: 'confirmar-cuenta'
         });
 




        req.flash('exito', 'Hemos enviado un E-mail, confirma tu cuenta');
        res.redirect('./iniciar-sesion');
       
    } catch (error) {
        // capturar los errores al intentar ingresar en la base de datos
        let erroresSequelize = error.errors.map(err => err.message);
        let listaErrores;
        
        if (erroresExpress.errors[0] !== undefined){
            // capturar los errores en caso de que los campos estén vacíos
            listaErrores = [erroresExpress.errors[0].msg];
        } else if (erroresSequelize !== undefined) {
            listaErrores = [...erroresSequelize];
        }
        console.log(listaErrores)
        req.flash('error', listaErrores);
        res.redirect('./crear-cuenta');
    }
}

// Confirma la suscripcion del usuario
exports.confirmarCuenta = async (req, res, next) => {
    // Verificar que el usuario exista
    const usuario = await Usuarios.findOne({where: {email: req.params.correo}});
    //Si no existe, redireccionar
    if (!usuario) {
        req.flash('error', 'No existe esa cuenta');
        res.redirect('/crear-cuenta');
        return next();
    }
    // Si existe
    usuario.activo = 1;
    await usuario.save();
    
    req.flash('exito', 'La cuenta se ha confirmado, ya puedes iniciar sesión');
    res.redirect('/iniciar-sesion');
}




// Formulario para iniciar sesiòn
exports.formIniciarSesion = (req, res) => {
    res.render('iniciar-sesion', {
        nombrePagina : 'Iniciar sesión'
    })
}
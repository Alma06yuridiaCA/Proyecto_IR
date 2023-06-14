const express = require ("express");
const router = express.Router();
const homeController = require('../controllers/homeController');
const usuariosController = require('../controllers/usuariosController');
const authController = require("../controllers/authController");
const adminController = require('../controllers/adminController');

const VarticuloController = require ('../controllers/VarticuloController');
const articulosController = require('../controllers/articulosController');





module.exports = function () {

    router.get("/", homeController.home);

    router.get("/crear-cuenta", usuariosController.formCrearCuenta);
    router.post("/crear-cuenta", usuariosController.crearNuevaCuenta);
    router.get('/confirmar-cuenta/:correo', usuariosController.confirmarCuenta);
   
   //Iniciar sesion
    router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
    router.post("/iniciar-sesion", authController.autenticarUsuario);
   
   //Panel de adminsitración
   router.get('/administracion',
   authController.usuarioAutenticado,
   adminController.panelAdministracion
    );

    
 //**ARTICULOS  */

 //Nuevos 
 router.get('/nuevo-articulo', 
 authController.usuarioAutenticado,
 articulosController.formNuevoArticulo
 );    

 router.post('/nuevo-articulo', 
 authController.usuarioAutenticado,
 articulosController.agregarArticulo
 );

 //Editar

 router.get('/editar-articulo/:articuloId',
 authController.usuarioAutenticado,
 articulosController.formEditarArticulo);

 router.post('/editar-articulo/:articuloId', 
 authController.usuarioAutenticado,
 articulosController.editarArticulo
 );


 //Eliminar 

 router.get('/eliminar-articulo/:articuloId',
 authController.usuarioAutenticado,
 articulosController.formEliminarArticulo);

 router.post('/eliminar-articulo/:articuloId',
 authController.usuarioAutenticado,
 articulosController.eliminarArticulo);




    
    //  Vista articulos
    router.get('/ver-articulo',
   VarticuloController.articulo
    );




    
    return router;

}
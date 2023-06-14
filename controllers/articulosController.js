const Articulos = require('../models/Articulos');
const {validationResult, body} = require('express-validator');

exports.formNuevoArticulo = async (req, res) => {
    res.render('nuevo-articulo', {
        nombrePagina: 'Agrega un nuevo artículo',
    })
}

//Almacena los docentes en la base de datos

exports.agregarArticulo = async (req, res) => {
    const articulo = req.body;
    const erroresExpress = validationResult(req);
  
    try {
      if (!erroresExpress.isEmpty()) {
        throw new Error(erroresExpress.errors[0].msg);
      }
  
      const nuevoArticulo = await Articulos.create(articulo);
      console.log('Artículo creado', nuevoArticulo);
      req.flash('exito', 'Artículo agregado exitosamente');
      res.redirect('./ver-articulo');
      console.log("Almacenado");
    } catch (error) {
      console.error(error);
      req.flash('error', 'Ha ocurrido un error al agregar el artículo');
      res.redirect('./nuevo-articulo');
    }
  };
  

//Editar 
exports.formEditarArticulo = async (req, res) => {
    const articulo = await Articulos.findByPk(req.params.articuloId);
    res.render('editar-articulo', {
        nombrePagina: `Editar articulo: ${articulo.descripcion}`,
        articulo
    })
}

//Guardar los cambios en la base de datos
exports.editarArticulo = async (req, res, next) =>{
    const articulo = await Articulos.findOne({
        where:{
            id: req.params.articuloId
        }
    });
    const {descripcion, unidades, precio} = req.body;


    articulo.descripcion = descripcion;
    articulo.unidades =unidades;
    articulo.precio=precio;
  
   
    await articulo.save();
    req.flash('exito', 'Cambios almacenados correctamente');
    res.redirect('/ver-articulo');
}

//Eliminar 

exports.formEliminarArticulo = async (req, res, next) =>{
    const articulo = await Articulos.findOne({
        where: {
            id: req.params.articuloId
        }
    });
    if (!articulo) {
        req.flash('error', 'operacion no valida');
        res.redirect('/ver-articulo');
        return next();

    }

    res.render('eliminar-articulo', {
        nombrePagina: `Eliminar articulo : ${articulo.descripcion}`
    })
    
}
exports.eliminarArticulo = async (req, res, next) =>{
    const articulo = await Articulos.findOne({
        where: {
            id: req.params.articuloId
        }
    });


    //Elimina el grupo
    await Articulos.destroy({
        where:{
            id: req.params.articuloId
        }
    });

    //Redireciionar
    req.flash('exito ','Articulo eliminado');
    res.redirect('/ver-articulo');
}
const Articulos = require('../models/Articulos');

exports.articulo = async (req, res) => {

   //Buscamos los articulos que pertenezcan al usuario
   const articulo = await Articulos.findAll({});

    res.render('ver-articulo', {
        nombrePagina: 'Articulos',
        articulo
    });
}

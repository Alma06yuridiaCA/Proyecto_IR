exports.panelAdministracion = async (req, res) => {
    //Buscamos todos los grupos que pertenezcan al usuario
    
    res.render('administracion', {
        nombrePagina: 'Panel de Administracion',
     
    });
}
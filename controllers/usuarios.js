//instanciamos la capa modelo correspondiente
let Usuarios = require('../models/usuarios');



// funciones de la libreria - metodos de la clase
const listartodos = async(req, res)=>{
try {
    //consultar todos sin filtro
    let listarUsuarios = await Usuarios.find().exec()
    res.status(200).send({
        exito:true,
        listarUsuarios
    })
} catch (error) {
    res.status(500).send({
        exito:false,
        msg:`error: ${error}`
    })
}
};


module.exports = {
    listartodos
}
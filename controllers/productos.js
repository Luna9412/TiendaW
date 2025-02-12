// controlador para el manejo de los productos

//conectamos el controlador con su modelo correspondiente

let producto = require('../models/productos')

//toda la logica de un crud típico listartodos, listarpor id, crear, actualizar, borrar...

const listartodos = async(req, res)=>{
try {
    //consultar todos sin filtro
    let listarProductos = await producto.find().exec()
    res.status(200).send({
        exito:true,
        listarProductos
    })
} catch (error) {
    res.status(500).send({
        exito:false,
        msg:"Error en la consulta"
    })
}
}

module.exports = {
    listartodos,
}
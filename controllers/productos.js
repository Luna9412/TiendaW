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
        msg:`error: ${error}`
    })
}
};
//crear nuevo
const nuevo = async (req, res) =>{
    // llega el objeto en el body del request
    let datos = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        imagen: req.body.imagen,
        marca: req.body.marca,
        precio: req.body.precio,
        existencia: req.body.existencia,
        rating: req.body.rating,
        numRevisiones: req.body.numRevisiones,
        estaOfertado: req.body.estaOfertado,
    };
    try{
        // instancia del modelo producto (collection)
    const productoNuevo = new producto(datos)
    productoNuevo.save() // escribe en mongo

    return res.send({
        estado: true,
        mensaje: "¡Insercion Existosa!"
    });
    }catch(error){
        return res.send ({
            estado:false,
            mensaje: `Error en la consulta ${error}`,
        });
    }
    // creamos el nuevo documento (qye agregaremos a la coleccion)
    //salvamos en mongo
}
// buscar por id o por otro parametros
const buscarPorID = async (req, res)=>{
    // recibimos le parametro por el cual debo buscar y eliminar
    let id = req.params.id;
try {
    //logica de buscar y mostar el resultado del query
    let consulta = await producto.findById(id).exec();
    return res.send({
        estado:true,
        mensaje: "Busqueda existosa!",
        consulta,
    });
} catch (error) { 
    return res.send ({
    estado:false,
    mensaje: "¡Error, no fue posible encontrar el registro!",
    consulta,
})
}
};
// actualizar de acuerdo al id del producto
const actualizarPorID=async (req, res)=>{
//recibe el parametro de la consulta
let id = req.params.id;


//payload que viene en el body :: los datos que manda el formulario
let payload = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    imagen: req.body.imagen,
    marca: req.body.marca,
    precio: req.body.precio,
    existencia: req.body.existencia,
    rating: req.body.rating,
    numRevisiones: req.body.numRevisiones,
    estaOfertado: req.body.estaOfertado,
};

try {
    let consulta = await producto.findByIdAndUpdate(id,payload).exec();
    return res.send({
        estado: true,
        mensaje: "documento creado!",
        consulta,
    })
} catch (error) {
    return res.send({
        estado: false,
        mensaje: "error en la consulta!",
        consulta,
    })
}

};



// borrar de acuerdo al id :::  RECUERDE QUE ESTE ES UN BORRADO DIDACTICO, NO USAR EN LA VIDA REAL
const borrarPorID= async(req, res)=>{
    // recibimos el parametro
    let id = req.params.id;

    try {
        let consulta = await producto.findOneAndDelete({_id:id}).exec();
        //let consulta= await producto.findByIdAndDelete(id).exec();
        return res.send({
            estado:true,
            mensaje: "¡Borrado existoso!",
            consulta,
        });
    } catch (error) {
        return res.send({
            estado:true,
            mensaje: "¡Error en la consulta!",
            consulta,
        })
    }
}
module.exports = {
    listartodos,
    nuevo,
    buscarPorID,
    borrarPorID,
    actualizarPorID
}
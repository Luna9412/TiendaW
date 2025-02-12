//modelo para la coleccion producto
//destructuring en la clase mongoose --solo traigo los metodos que me importan
const {Schema, model, Collection} = require('mongoose')

//Creamos el schema

const productoSchema = Schema({
    //nombre:String,
    nombre:{
        type:String,
        required:true
    },
    //precio:Number,
    precio:{
        type:Number,
        required:false
    },
    //existencia:Number,
    existencia:{
        type:Number,
        required:true
    }
},
{Collection:"producto"}
)

module.exports = model("Producto", productoSchema)
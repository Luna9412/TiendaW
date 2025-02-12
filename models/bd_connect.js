//Instanciar la librería
const mongoose = require('mongoose')

const conexion = async()=>{
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/etienda')
        console.log('OK conectado!!')
    } catch (error) {
        console.log(`error al intentar conectar con la bd:  ${error}`)
    }    
}

module.exports = conexion
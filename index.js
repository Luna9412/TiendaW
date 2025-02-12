//Librerías base

const express = require('express')

const app = express()
const cors = require('cors')

//middleware de la app
app.use(cors())
app.use(express.json())


//llamamos la librería de conexión
const conexion = require('./models/bd_connect')
conexion()

//Rutas globales

const productoRta = require("./routes/productos")

//Usamos las rutas
app.use('/api', productoRta)

app.listen(4000,()=>(
    console.log(`listen ${4000}`)
))
//rutas para consumir el modulo productos de nuestro servicio

const express = require("express")
const router = express.Router()

//instanciamos el controlador correspondiente
const productoCtr = require('../controllers/productos')

//rutas que entregará el modulo producto

router.get("/producto/listartodos", productoCtr.listartodos)

//......

module.exports = router
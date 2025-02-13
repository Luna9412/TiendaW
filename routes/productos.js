//rutas para consumir el modulo productos de nuestro servicio

const express = require("express")
const router = express.Router()

//instanciamos el controlador correspondiente
const productoCtr = require('../controllers/productos')

//rutas que entregará el modulo producto

router.get("/producto/listartodos", productoCtr.listartodos);
router.post("/producto/nuevo",productoCtr.nuevo);
router.get("/producto/buscarPorID/:id",productoCtr.buscarPorID);
router.delete("/producto/borrarPorID/:id",productoCtr.borrarPorID);
router.put("/producto/actualizarPorID/:id",productoCtr.actualizarPorID);
//......

module.exports = router
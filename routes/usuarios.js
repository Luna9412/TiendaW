//rutas para consumir el modulo productos de nuestro servicio

const express = require("express")
const router = express.Router()

//instanciamos el controlador correspondiente
const usuariosCtr = require('../controllers/usuarios')

//rutas que entregará el modulo producto

router.get("/usuarios/listartodos", usuariosCtr.listartodos);
router.post("/usuarios/nuevo",usuariosCtr.nuevo);
router.get("/usuarios/buscarPorID/:id",usuariosCtr.buscarPorID);
router.delete("/usuarios/borrarPorID/:id",usuariosCtr.borrarPorID);
router.put("/usuarios/actualizarPorID/:id",usuariosCtr.actualizarPorID);
//......

module.exports = router
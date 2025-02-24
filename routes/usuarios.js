//rutas para consumir el modulo productos de nuestro servicio
const express = require("express")
const router = express.Router()
//instanciamos el controlador correspondiente
const usuariosCtr = require('../controllers/usuarios')
//rutas que entregará el modulo producto
router.get("/usuarios/listartodos", usuariosCtr.listartodos);
router.post("/usuarios/registro",usuariosCtr.registro);
router.put("/usuarios/login",usuariosCtr.login);
//......
module.exports = router
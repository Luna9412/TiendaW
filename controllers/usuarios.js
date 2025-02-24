let bcrypt = require("bcryptjs")
let Usuarios = require('../models/usuarios');
let jwt = require("jsonwebtoken");
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
/**
@description Funcion que hace la creacion o registro de los usuarios del sistema
@author Juan Luna
@param req la peticion de con la data del formulario del registro del usuario
@param res falso si no existe el usuario, true y mensaje de exito si se crea, false y mensaje de error si no ingresa la password
@version 0.1 -24-02-2025
@callback funcion asincronica que ejecuta la API
@function registro en el sistema
@classs Usuarios
*/
const registro = async (req, res) => {
    //recibir la data
    let data = {
        nombre: req.body.nombre,
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
        telefono: req.body.telefono,
        esAdmin: req.body.esadmin,
        direccion: req.body.direccion,
        zip: req.body.zip,
        ciudad: req.body.ciudad,
        pais: req.body.pais,
    };
    let usuarioExiste = await Usuarios.findOne({ email: req.body.email }); 
    if (usuarioExiste) {
        return res.send({
            estado: false,
            mensaje: "el usuario ya esta registrado en el sistema",
        });
    }
    try {
    //objeto
        let usuarioNuevo = new Usuarios(data);
        usuarioNuevo.save();
        res.send({
            estado: true,
            mensaje: "Usuario creado",
        });
        } catch (error) {
            res.send({
                estado: false,
                mensaje: "¡Usuario no creado!",
                error
            });
        }
    };
/**
@description Funcion que hace el login o ingreso al sistema con autenticacion de 2 factores
@author Juan Luna
@param req la peticion con usuario y password
@param res falso si no existe el usuario, si existe devuelve true y el token en formato json con ventana de vida de 4H
@version 0.1 -24-02-2025
@callback funcion asincronica que ejecuta la API
@function login del sistema
*/
    const login = async function(req, res) {
        let data = req.body.email;
        let usuarioExiste = await Usuarios.findOne({ email: data });
        if (!usuarioExiste) {
            return res.send({
            estado: false,
            mensaje: "¡Usuario no existe en la Bd!",
            });
        }
        if(usuarioExiste && bcrypt.compareSync(req.body.password, usuarioExiste.passwordHash)){
            const token = jwt.sign(
                {
                userId: usuarioExiste.id,
                isAdmin: usuarioExiste.esAdmin
                },
                //salt de la codificada o hashing o encriptado
                seCreTo,
                // vida util del token
                {expiresIn:"4h"}
            );
            return res.send({
                estado: true,
                mensaje: "Ingreso exitoso al sistema",
                token
            });
        }else{
            return res.send({
                estado: false,
                mensaje: "¡Credenciales erroneas, intente de nuevo!",
                error
            });
        }
        //generar token
    }
module.exports = {
    listartodos,
    registro,
    login
}
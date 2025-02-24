//instanciamos la capa modelo correspondiente
let bcrypt = require("bcryptjs")
let Usuarios = require('../models/usuarios');
let jwt = require("jsonwebtoken");
// funciones de la libreria - metodos de la clase
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
    //login tradicional : autenticacion de un factor
    const login = async (req, res) => {
    // recibir data: user / pass
        let data = req.body.email;
        //validar que el usuario exista en la bd
        let usuarioExiste = await Usuarios.findOne({ email: data });
        //console.log(usuarioExiste);
        if (!usuarioExiste) {
            return res.send({
            estado: false,
            mensaje: "¡Usuario no existe en la Bd!",
            });
        }
        //validar credenciales
        if(usuarioExiste && bcrypt.compareSync(req.body.password, usuarioExiste.passwordHash)){
        //autenticacion de 2 factores con generacion del token
            
            const token = jwt.sign(
                // datos a codificar en el token
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
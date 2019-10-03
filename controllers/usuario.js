const Usuario = require('../models/usuario')

function addUsuario(req, res) {
    let { nombre, telefono, correo, usuario, password, role } = req.body
    if (nombre && telefono && usuario && password) {
        let usuarioNuevo = new Usuario()
        usuarioNuevo.nombre = nombre
        usuarioNuevo.telefono = telefono
        usuarioNuevo.correo = correo || ''
        usuarioNuevo.usuario = usuario
        usuarioNuevo.password = password
        usuarioNuevo.role = role || 'INTENDENTE'
        usuarioNuevo.save((err, usuarioSaved) => {
            if (err) return res.status(500).send({
                message: 'Ocurrio un error inesperado al guardar el usuario',
                description: err
            })
            console.log('Nuevo usuario guardado: ', usuarioSaved)
            return res.status(200).send({
                message: `Usuario guardado con exito`,
                description: usuarioSaved
            })
        })
    } else {
        res.status(403).send({
            message: 'No se mandaron todos los datos',
            description: Usuario
        })
    }
}

function updateUsuario(req, res) {
    let id = req.params.id
    let data = req.body
    Usuario.findOneAndUpdate({ _id: id }, data, (err, usuarioUpdated) => {
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al actualizar el usuario',
            description: err
        })
        return res.status(200).send({
            message: `Usuario actualizado con exito`,
            description: usuarioUpdated
        })

    })
}

function getUsuarios(req,res){
    Usuario.find((err, usuarios)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de usuarios',
            description: err
        })
        return res.status(200).send({
            message: `Usuarios encontrados`,
            description: usuarios
        })
    })
}

function getUsuario(req,res){
    let id = req.params.id
    Usuario.findOne({_id:id},(err, usuarios)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de usuarios',
            description: err
        })
        return res.status(200).send({
            message: `Usuarios encontrados`,
            description: usuarios
        })
    })
}

function getIntendentes(req,res){
    Usuario.find({role:'intendente'}).exec((err, usuarios)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de usuarios',
            description: err
        })
        return res.status(200).send({
            message: `Usuarios encontrados`,
            description: usuarios
        })
    });
}

module.exports = {
    addUsuario,
    updateUsuario,
    getUsuario,
    getUsuarios,
    getIntendentes
}
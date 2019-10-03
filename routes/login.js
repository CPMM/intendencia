'use strict'
const router = require('express').Router();
const Usuario = require('../models/usuario');

router.post('/',(req,res)=>{
    let { usuario, password } = req.body; 
    if(usuario && password){
        Usuario.findOne({usuario},(err,usuarioFinded)=>{
            if(err) return res.status(500).send({message:'Error al consultar rn la base de datos', description:err});
            if(!usuarioFinded) return res.status(404).send({message:'No se encontro el usuario', description:'na'});
            if(usuarioFinded.password != password) return res.status(403).send({message:'Contraseña incorrecta', description:'na'});
            return res.status(200).send({
                message:'Bienvenido' + usuarioFinded.nombre,
                description:usuarioFinded
            })
        });
    }else return res.status(403).send({
        message:'No se mandaron todos los datos',
        description:req.body
    })
});

module.exports =  router;
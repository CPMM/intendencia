// @ts-nocheck
const Usuario = require('../models/usuario'),
    Area = require('../models/area'),
    TareaRealizada = require('../models/tareaRealizada')
const busboy = require('connect-busboy'),
    path = require('path'),
    fs = require('fs-extra');
const { dirFotosUsuario } = require('../global');


function updateFotoUsuario (req,res){
    let id_usuario = req.params.id;
    let nombre_foto;
    let guardarEn;
    Usuario.findById(id_usuario,(err,uFinded)=>{
        if(err) return res.status(500).send({
            message:'Error al consultar en la base de datos',
            description:err
        });
        if(!uFinded) return res.status(500).send({
            message:'No se encontro al usuario'
        });
        if(uFinded.foto){ 
            var path_foto = path.join(dirFotosUsuario,uFinded.foto);
            fs.unlink(path_foto);//eliminamos la foto si ya tiene
        }
        req.pipe(req.busboy);
        req.busboy.on('file', (fieldname, file, filename)=>{
            let archivo = filename.split('.');
            nombre_foto = id_usuario + '.' + archivo[archivo.length - 1];
            guardarEn = path.join(dirFotosUsuario, path.basename(nombre_foto));
            file.pipe(fs.createWriteStream(guardarEn));
        });
        req.busboy.on('finish',()=>{
            Usuario.findByIdAndUpdate(id_usuario,{foto:nombre_foto},{new:true},(err,usuarioUpdated)=>{
                if(err) return res.status(500).send({
                    message:'Error al actualizar en la base de datos',
                    description:err
                });
                res.status(200).send({
                    message:'Foto guardada',
                    description:usuarioUpdated
                });
            });  
        });
    });
}

function updateFotosArea(req,res){
    let id_area = req.params.id;
    Area.findById(id_area,(err,tFinded)=>{
        if (err) return res.status(500).send({
            message:'Error al consultar en la base de datos',
            description:err
        });
        if(!tFinded) return res.status(404).send({message:'No se encontro la tarea'});
        //si la tarea realizada ya tiene fotos guaradas las borramos: 
        if(tFinded.fotos && tFinded.fotos.length >= 1){
            for (let i = 0; i < tFinded.fotos.length; i++) {
                var path_foto = path.join(dirFotosUsuario,tFinded.fotos[i]);
                fs.unlink(path_foto);//eliminamos la foto si ya tiene
            }
        }
        req.pipe(req.busboy);
        let nuevasFotos = []; 
        req.busboy.on('file',(fieldname, file, filename)=>{
            var archivo = filename.split('.'); 
            nuevasFotos.push(`${id_area}${(Math.random() * (9999 - 1) * 1)}.${archivo[archivo.length - 1]}`);
            var guardar_path = path.join(dirFotosUsuario, nuevasFotos[nuevasFotos.length-1]);
            file.pipe(fs.createWriteStream(guardar_path));
        })
        req.busboy.on('finish',()=>{
            Area.findByIdAndUpdate(id_area,{fotos:nuevasFotos},{new:true},(err, tareaUpdated)=>{
                if (err) return res.status(500).send({
                    message:'Error al actualizar en la base de datos',
                    description:err
                });
                res.status(200).send({
                    message:'Fotos guardadas',
                    description:tareaUpdated
                });
            });
        });
    });
}


function updateTareaRealizada(req,res){
    let id_tarea = req.params.id;
    TareaRealizada.findById(id_tarea,(err,tFinded)=>{
        if (err) return res.status(500).send({
            message:'Error al consultar en la base de datos',
            description:err
        });
        if(!tFinded) return res.status(404).send({message:'No se encontro la tarea'});
        //si la tarea realizada ya tiene fotos guaradas las borramos: 
        if(tFinded.fotos && tFinded.fotos.length >= 1){
            for (let i = 0; i < tFinded.fotos.length; i++) {
                var path_foto = path.join(dirFotosUsuario,tFinded.fotos[i]);
                fs.unlink(path_foto);//eliminamos la foto si ya tiene
            }
        }
        req.pipe(req.busboy);
        let nuevasFotos = []; 
        req.busboy.on('file',(fieldname, file, filename)=>{
            var archivo = filename.split('.'); 
            nuevasFotos.push(`${id_tarea}${(Math.random() * (9999 - 1) * 1)}.${archivo[archivo.length - 1]}`);
            var guardar_path = path.join(dirFotosUsuario, nuevasFotos[nuevasFotos.length-1]);
            file.pipe(fs.createWriteStream(guardar_path));
        })
        req.busboy.on('finish',()=>{
            TareaRealizada.findByIdAndUpdate(id_tarea,{fotos:nuevasFotos},{new:true},(err, tareaUpdated)=>{
                if (err) return res.status(500).send({
                    message:'Error al actualizar en la base de datos',
                    description:err
                });
                res.status(200).send({
                    message:'Fotos guardadas',
                    description:tareaUpdated
                });
            });
        });
    });
}

function updateQuejas(req,res){
    console.log('\n\n\n\n');
    console.log('------------------------');
    console.log('updatetarearealizada');
    console.log('------------------------');
    let id_tarea = req.params.id;
    let queja_vieja;
    TareaRealizada.findById(id_tarea,(err,tFinded)=>{
        if (err) return res.status(500).send({
            message:'Error al consultar en la base de datos',
            description:err
        });
        if(!tFinded && !tFinded.queja) return res.status(404).send({message:'No se encontro la queja'});
        //si la tarea realizada ya tiene fotos guaradas las borramos: 
        if(tFinded.queja.fotos ){
            if(tFinded.queja.fotos.length >= 1){
                for (let i = 0; i < tFinded.fotos.length; i++) {
                    var path_foto = path.join(dirFotosUsuario,tFinded.queja.fotos[i]);
                    fs.unlink(path_foto);//eliminamos la foto si ya tiene
                }
            }   
        }
        req.pipe(req.busboy);
        let nuevasFotos = []; 
        queja_vieja = tFinded.queja;
        req.busboy.on('file',(fieldname, file, filename)=>{
            console.log('\n\n\n\n');
            console.log('------------------------');
            console.log('foto para queja: \n');
            console.log(file);
            console.log('------------------------');
            var archivo = filename.split('.'); 
            nuevasFotos.push(`queja.${id_tarea}${(Math.random() * (9999 - 1) * 1)}.${archivo[archivo.length - 1]}`);
            var guardar_path = path.join(dirFotosUsuario, nuevasFotos[nuevasFotos.length-1]);
            file.pipe(fs.createWriteStream(guardar_path));
        })
        req.busboy.on('finish',()=>{
            queja_vieja['fotos'] = nuevasFotos;
            TareaRealizada.findByIdAndUpdate(id_tarea,{queja:queja_vieja},{new:true},(err, tareaUpdated)=>{
                if (err) return res.status(500).send({
                    message:'Error al actualizar en la base de datos',
                    description:err
                });
                res.status(200).send({
                    message:'Fotos guardadas',
                    description:tareaUpdated
                });
            });
        });
    });
}

function getFoto(req,res){
    let foto = req.params.foto;
    console.log(foto);
    res.sendfile( path.join(dirFotosUsuario , foto));
}

module.exports = {
    updateFotoUsuario,
    updateFotosArea,
    updateTareaRealizada,
    updateQuejas,
    getFoto
}



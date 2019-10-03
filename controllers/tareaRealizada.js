const TareaRealizada = require('../models/tareaRealizada'); 
const TareaArea = require('../models/tareasArea');
const moment = require('moment');

function add(req,res){
    let {tarea,intendente, comentario} = req.body;
    if(tarea && intendente){
        let tareaNueva =  new TareaRealizada({
            tarea,
            intendente,
            comentario: comentario || 'Sin comentario',
            fecha: moment().format('YYYY-MM-DD hh:mm:ss')
        }).save((err,tareaSaved)=>{
            if(err) return res.status(500).send({
                messaage:'Error al guardar la tarea en la base de datos',
                description :err
            });
            TareaArea.findByIdAndUpdate(tarea,{fecha_ultima:moment().format('YYYY-MM-DD')},(err, tareaUpdated)=>{
                if(err) return res.status(500).send({
                    messaage:'Error al actualizar la fecha de la tarea asignada, sin embargo la tarea realizada se guardo con éxito',
                    description :err
                });
                return res.status(200).send({
                    message:'Tarea realizada guardada',
                    description:tareaSaved
                });
            });
        });
    }else{
        return res.status(500).send({
            message:'No se mandaron todos los campos',
            description: req.body
        });
    }
}

function addQueja(req,res){
    let id_tarea = req.params.id;
    let {comentario} = req.body /**
    * queja:{
    *  comentario:'',
    *  foto: '',
    *  fecha: ''
    * }
    */
    if(comentario){
        let queja = {
            comentario,
            fecha:moment().format('YYYY-MM-DD hh:mm:ss')
        };
        TareaRealizada.findByIdAndUpdate(id_tarea, {queja:queja} , {new:true} ,(err, tareaUpdated)=>{
            if(err) return res.status(500).send({
                messaage:'Error al guardar la tarea en la base de datos',
                description :err
            });
            return res.status(200).send({
                message:'Tarea realizada guardada',
                description:tareaUpdated
            });
        });
    }else{
        return res.status(500).send({
            message:'No se enviaron todos los campos',
        }); 
    }
}

function getTodas (req,res){
    TareaRealizada.find()
    .populate({path:'intendente'})
    .populate({path:'tarea', populate:{path:'area'}})
    .exec((err, tareas)=>{
        if(err) return res.status(500).send({
            messaage:'Error al guardar la tarea en la base de datos',
            description :err
        });
        return res.status(200).send({
            message:'Tarea realizada guardada',
            description:tareas
        });
    });
}

function getTarea (req,res){
    let id = req.params.id;
    TareaRealizada.findById(id)
    .populate({path:'intendente'})
    .populate({path:'tarea', populate:{path:'area'}})
    .exec((err, tareas)=>{
        if(err) return res.status(500).send({
            messaage:'Error al guardar la tarea en la base de datos',
            description :err
        });
        return res.status(200).send({
            message:'Tarea realizada guardada',
            description:tareas
        });
    });
}

function getXIntendente(req,res){
    let id_intendente = req.params.id;
    TareaRealizada.find({intendente:id_intendente})
    .populate({path:'intendente'})
    .populate({path:'tarea', populate:{path:'area'}})
    .exec((err, tareas)=>{
        if(err) return res.status(500).send({
            messaage:'Error al consultar la tarea en la base de datos',
            description :err
        });
        return res.status(200).send({
            message:'Tarea realizada guardada',
            description:tareas
        });
    });
}

function getDelDiaXIntendente(req,res){
    let id_intendente = req.params.id;
    let hoy = moment().format('YYYY-MM-DD'); 
    TareaRealizada.find({intendente:id_intendente})
    .populate({path:'intendente'})
    .populate({path:'tarea', populate:{path:'area'}})
    .exec((err, tareas)=>{
        if(err) return res.status(500).send({
            messaage:'Error al consultar la tarea en la base de datos',
            description :err
        });
        let newTareas= [];
        for (let i = 0; i < tareas.length; i++) {
            if(tareas[i].fecha.substring(0,10) == hoy){
                newTareas.push(tareas[i]);
            }
        }
        return res.status(200).send({
            message:'Tarea realizada guardada',
            description:newTareas
        });
    });
}

module.exports = {
    add,
    addQueja,
    getTarea,
    getTodas,
    getXIntendente,
    getDelDiaXIntendente
}
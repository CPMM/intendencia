const TareaArea = require('../models/tareasArea')

function addTareaArea(req,res){
    let { nombre, descripcion, area } = req.body
    if(nombre && descripcion){
        let tareaArea = new TareaArea({
            area: area,
            nombre:nombre,
            descripcion:descripcion
        }).save((err, tareaAreaSaved)=>{
            if (err) return res.status(500).send({
                message: 'Ocurrio un error inesperado al guardar en la base de datos',
                description: err
            })
            console.log('Nuevo usuario guardado: ', tareaAreaSaved)
            return res.status(200).send({
                message: `Tarea de área guardada con exito`,
                description: tareaAreaSaved
            })
        })
    }else{
        res.status(403).send({
            message: 'No se mandaron todos los datos',
            description: TareaArea
        })
    }
}

function updateTareaArea(req,res){
    let id = req.params.id
    let data = req.body
    TareaArea.findOneAndUpdate({ _id: id }, data, (err, tareaAreaUpdated) => {
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al actualizar en la base de datos',
            description: err
        })
        return res.status(200).send({
            message: `Tarea de área actualizada con exito`,
            description: tareaAreaUpdated
        })

    })
}

function getTareaAreas(req,res){
    TareaArea.find()
    .populate({path:'area'})
    .populate({path:'intendente'})
    .exec((err, tareasAreas)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de áreas',
            description: err
        })
        return res.status(200).send({
            message: `Áreas encontrados`,
            description: tareasAreas
        })
    })
}

function getTareaArea(req,res){
    let id = req.params.id
    TareaArea.findOne({_id:id})
    .populate({path:'area'})
    .populate({path:'intendente'})
    .exec((err, tareasAreas)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de áreas',
            description: err
        })
        return res.status(200).send({
            message: `Áreas encontrados`,
            description: tareasAreas
        })
    })
}

function asignarIntendente(req,res){ //nueva
    let id_tarea = req.params.id; 
    let intendente = req.body.intendente; //por el body me mandaran el intendente
    if(!intendente) return res(404).send({message:'No se mandaron todos los campos', des:''});
    TareaArea.findByIdAndUpdate(id_tarea, {intendente, status:true}, {new:true},(err,tareaUpdated)=>{
        if(err) return res.status(500).send({
            message:'Error al asignar tarea al intendente',
            description:err
        });
        return res.status(200).send({
            message:'Tarea asignada',
            descripcion: tareaUpdated
        });
    })
}

function getSinAsignar(req,res){ //nuevo
    TareaArea.find({status:false})
    .populate({path:'area'})
    .exec((err, tareasAreas)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de áreas',
            description: err
        })
        return res.status(200).send({
            message: `Áreas encontrados`,
            description: tareasAreas
        })
    })
}

function getAsignadas(req,res){ //nuevo
    TareaArea.find({status:true})
    .populate({path:'area'})
    .populate({path:'intendente'})
    .exec((err, tareasAreas)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de áreas',
            description: err
        })
        return res.status(200).send({
            message: `Áreas encontrados`,
            description: tareasAreas
        })
    })
}

function getXIntendente(req,res){
    let intendente = req.params.id;
    TareaArea.find({status:true, intendente})
    .populate({path:'area'})
    .populate({path:'intendente'})
    .exec((err, tareasAreas)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de áreas',
            description: err
        })
        return res.status(200).send({
            message: `Áreas encontrados`,
            description: tareasAreas
        })
    })
}

function desagsignar(req,res){ //nueva
    let id_tarea = req.params.id; 
    TareaArea.findByIdAndUpdate(id_tarea, {status:false}, {new:true},(err,tareaUpdated)=>{
        if(err) return res.status(500).send({
            message:'Error al asignar tarea al intendente',
            description:err
        });
        return res.status(200).send({
            message:'Tarea desasignada',
            descripcion: tareaUpdated
        });
    })
}

module.exports = {
    addTareaArea,
    updateTareaArea,
    getTareaArea,
    getTareaAreas,
    asignarIntendente,
    getSinAsignar,
    getAsignadas,
    getXIntendente,
    desagsignar
}
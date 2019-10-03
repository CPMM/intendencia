const Area = require('../models/area')

function addArea(req,res){
    let { nombre, descripcion } = req.body
    if(nombre && descripcion){
        let area = new Area({
            nombre:nombre,
            descripcion:descripcion
        }).save((err, areaSaved)=>{
            if (err) return res.status(500).send({
                message: 'Ocurrio un error inesperado al guardar en la base de datos',
                description:''
            })
            console.log('Nuevo usuario guardado: ', areaSaved)
            return res.status(200).send({
                message: `Área guardado con exito`,
                description: areaSaved
            })
        })
    }else{
        res.status(403).send({
            message: 'No se mandaron todos los datos',
            description: Area
        })
    }
}

function updateArea(req,res){
    let id = req.params.id
    let data = req.body
    Area.findOneAndUpdate({ _id: id }, data, (err, areaUpdated) => {
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al actualizar en la base de datos',
            description: err
        })
        return res.status(200).send({
            message: `Área actualizado con exito`,
            description: areaUpdated
        })

    })
}

function getAreas(req,res){
    Area.find((err, areas)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de áreas',
            description: err
        })
        return res.status(200).send({
            message: `Áreas encontrados`,
            description: areas
        })
    })
}



function getArea(req,res){
    let id = req.params.id
    Area.findOne({_id:id},(err, areas)=>{
        if (err) return res.status(500).send({
            message: 'Ocurrio un error inesperado al obtener listado de áreas',
            description: err
        })
        return res.status(200).send({
            message: `Áreas encontrados`,
            description: areas
        })
    })
}




module.exports = {
    addArea,
    updateArea,
    getArea,
    getAreas
}
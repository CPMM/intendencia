const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    moment = require('moment');
let tareaRalizadaSchema = new Schema({
    intendente:{ type:Schema.Types.ObjectId, ref:'Usuario', required:true},
    tarea: { type:Schema.Types.ObjectId, ref:'TareasArea', required:true },
    comentario: { type:String, default:'Sin comentario' },
    fotos: {type:Array, default:[]} ,
    fecha: { type:String, default:moment().format('YYYY-MM-DD hh:mm:ss'), unique:true},
    queja:{ type: Object, default:{}}
})
module.exports = mongoose.model('TareasRealizada', tareaRalizadaSchema);


/**
 * 
 * queja:{
 *  comentario:'',
 *  foto: '',
 *  fecha: ''
 * }
 * 
 */
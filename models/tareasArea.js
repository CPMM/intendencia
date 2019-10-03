const mongoose = require('mongoose'),
    Schema = mongoose.Schema
let tareaAreaSchema = new Schema({
    area: { type:Schema.Types.ObjectId, ref:'Area' },
    nombre: { type:String, required:true, unique:true },
    intendente: { type:Schema.Types.ObjectId, ref:"Usuario" },
    descripcion: {type:String, required:true},
    fecha_ultima : { type:String, default:'' }, //nuevo
    status:{type:Boolean, default:false}
})
module.exports = mongoose.model('TareasArea', tareaAreaSchema);
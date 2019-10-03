const mongoose = require('mongoose'),
    Schema = mongoose.Schema
let areaSchema = new Schema({
    nombre: { type: String, required: true, unique: true },
    descripcion: { type: String, required: true },
    fotos:{type:Array, default:[]},
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model('Area', areaSchema);
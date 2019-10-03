const mongoose = require('mongoose'),
    Schema = mongoose.Schema
    
let usuarioSchema = new Schema({
    nombre: { type: String, required: true },
    telefono: { type: String, unique: true, required: true },
    correo: { type: String, unique: true },
    usuario: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type:String, required:true },
    foto: String,
    status: { type: Boolean, default: true }
})

module.exports = mongoose.model('Usuario', usuarioSchema)
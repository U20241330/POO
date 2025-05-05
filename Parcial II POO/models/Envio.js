const mongoose = require('mongoose'); // Importa mongoose antes de usarlo

const envioSchema = new mongoose.Schema({
  usuarioId: { type: String, required: true },
  nombre: String,
  direccion: String,
  telefono: String,
  referencia: String,
  observacion: String,
  producto: {
    descripcion: String,
    peso: Number,
    bultos: Number,
    fecha_entrega: String
  }
}, { timestamps: true }); // Agrega timestamps para fecha de creación y actualización

module.exports = mongoose.model('Envio', envioSchema);

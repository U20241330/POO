const express = require('express');
const router = express.Router();
const Usuario = require('../models/Usuario');
const Envio = require('../models/Envio');
//pongame un diezito inge bless
// GET: verificar credito del usuario
router.get('/usuario/:id/credito', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ credito: usuario.credito });
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener envíos disponibles' });
  }
});

// POST: registrar envío
router.post('/envios', async (req, res) => {
  try {
    const { usuarioId, nombre, direccion, telefono, referencia, observacion, producto } = req.body;

    console.log(req.body);

    
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    let peso = producto.peso;
    let bultos = producto.bultos;

// Ajuste dinámico para calcular costo basado en peso y cantidad de bultos
    let costo = Math.ceil((peso / 3) + (bultos * 0.5)); 


    if (usuario.credito < costo) {
      return res.status(400).json({ mensaje: 'Créditos insuficientes para enviar' });
    }

    const nuevoEnvio = new Envio({ usuarioId, nombre, direccion, telefono, referencia, observacion, producto });

    await nuevoEnvio.save();
    usuario.credito -= costo;
     console.log('Crédito después del descuento:', usuario.credito); // Verifica el cambio antes de guardar

    await usuario.save();

    res.json({ mensaje: 'Envío registrado', envio: nuevoEnvio });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar envío' });
  }
});

// GET: consultar envíos por usuario
router.get('/envios/:usuarioId', async (req, res) => {
  try {
    const envios = await Envio.find({ usuarioId: req.params.usuarioId });
    res.json(envios);
  } catch (err) {
    res.status(500).json({ error: 'Error al consultar envíos' });
  }
});

// DELETE: eliminar envío y devolver crédito
router.delete('/envios/:envioId', async (req, res) => {
  try {
    console.log('Intentando eliminar envío con ID:', req.params.envioId);
    
    const envio = await Envio.findOne({_id: req.params.envioId});
    if (!envio) return res.status(404).json({ mensaje: 'Envío no reconocido o encontrado' });

    const usuario = await Usuario.findById(envio.usuarioId);
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado' });

    let peso = envio.producto.peso;
    let creditoRestaurado = peso <= 3 ? 1 : Math.ceil(peso / 3);

    usuario.credito += creditoRestaurado;
    console.log('Antes de guardar en MongoDB:', usuario);
    await usuario.save();
    console.log('Después de guardar en MongoDB:', usuario);
    await envio.deleteOne();

    res.json({ mensaje: 'Envío eliminado y crédito reembolsado' });
  } catch (err) {
    res.status(500).json({ error: 'Archivo inexistente' });
  }
});


module.exports = router;

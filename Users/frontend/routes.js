const express = require('express'); 
const router = express.Router(); 

const registro = require('./registro'); 
router.get('/usuarios', registro.getUsuarios); 
router.get('/usuarios/:id', registro.getUsuariosById); 
router.post('/usuarios', registro.createUsuarios); 
router.put('/usuarios/:id', registro.updateUsuarios); 
router.delete('/usuarios/:id', registro.deleteUsuarios); 

module.exports = router;

/// DEFINE TODAS AS ROTAS DO SITE
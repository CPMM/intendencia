const router = require('express').Router()
const usuarioCtrl = require('../controllers/usuario')

router.post('/', usuarioCtrl.addUsuario)
router.put('/:id', usuarioCtrl.updateUsuario)
router.get('/:id', usuarioCtrl.getUsuario)
router.get('/', usuarioCtrl.getUsuarios)
router.get('/get/intendentes', usuarioCtrl.getIntendentes)

module.exports = router
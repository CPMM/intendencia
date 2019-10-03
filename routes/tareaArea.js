const router = require('express').Router()
const tareaareaCtrl = require('../controllers/tareasArea')

router.post('/', tareaareaCtrl.addTareaArea)
router.put('/:id', tareaareaCtrl.updateTareaArea)
router.put('/asignar/:id', tareaareaCtrl.asignarIntendente)
router.put('/desasignar/:id', tareaareaCtrl.desagsignar)
router.get('/', tareaareaCtrl.getTareaAreas)
router.get('/sinasignar', tareaareaCtrl.getSinAsignar)
router.get('/asiganadas', tareaareaCtrl.getAsignadas)
router.get('/id/:id', tareaareaCtrl.getTareaArea)
router.get('/intendente/:id', tareaareaCtrl.getXIntendente)

module.exports = router
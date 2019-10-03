const router = require('express').Router()
const tareaRalizadaCtrl= require('../controllers/tareaRealizada');

router.post('/', tareaRalizadaCtrl.add)
router.put('/queja/:id', tareaRalizadaCtrl.addQueja)
router.get('/', tareaRalizadaCtrl.getTodas)
router.get('/:id', tareaRalizadaCtrl.getTarea)
router.get('/intendente/:id', tareaRalizadaCtrl.getXIntendente)
router.get('/intendente/dia/:id', tareaRalizadaCtrl.getDelDiaXIntendente)

module.exports=router
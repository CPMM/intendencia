const router = require('express').Router()
const areaCtrl = require('../controllers/area')

router.post('/', areaCtrl.addArea)
router.put('/:id', areaCtrl.updateArea)
router.get('/', areaCtrl.getAreas)
router.get('/:id', areaCtrl.getArea)

module.exports = router
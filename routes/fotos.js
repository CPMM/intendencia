const router = require('express').Router()
const fotosRoutes = require('../controllers/fotos');

router.put('/usuario/:id', fotosRoutes.updateFotoUsuario)
router.put('/area/:id', fotosRoutes.updateFotosArea)
router.put('/tarearealizada/:id', fotosRoutes.updateTareaRealizada)
router.put('/queja/:id', fotosRoutes.updateQuejas)
router.get('/:foto', fotosRoutes.getFoto)

module.exports = router
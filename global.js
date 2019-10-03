const path = require('path');
module.exports = {
    port : process.env.PORT || 3000,
    dirFotosUsuario: path.join( __dirname, 'fotos', 'usuarios')
}
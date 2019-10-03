const express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    app = express();
    const busboy = require('connect-busboy');
//ROUTES
const usuarioRoutes = require('./routes/usuario')
const areaRoutes = require('./routes/area')
const tareaAreaRoute = require('./routes/tareaArea')
const tareaRealizadaRoutes = require('./routes/tareaRealizada')
const fotosRoutes = require('./routes/fotos');

//MIDLEWARES
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
})); // Insert the busboy middle-ware


app.use(function (req, res, next) {
    //Enabling CORS
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization')
    next()
})

//ROUTES
app.get('/',(req,res)=>{
    res.send({message:'Hola amigos'})
})

app.use('/login', require('./routes/login'));
app.use('/usuario', usuarioRoutes)
app.use('/area', areaRoutes)
app.use('/tareaarea', tareaAreaRoute)
app.use('/tarearealizada', tareaRealizadaRoutes)
app.use('/foto', fotosRoutes)

module.exports = app

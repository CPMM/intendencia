const app = require('./app'),
    global = require('./global'),
    mongoose = require('mongoose');
    

mongoose.connect('mongodb://uqk0okdb5y0a5kvwwdsy:X357y2beERkzn9IlWCPj@b3hhxthrovptlf7-mongodb.services.clever-cloud.com:27017/b3hhxthrovptlf7',{useNewUrlParser:true})
    .then(
        ()=>{
            console.info(`BD is Connected`);
            app.listen(global.port,(err)=>{
                if(err) throw err; 
                console.info(`Server on port ${global.port}`);
            });
        }
    )
    .catch((e)=>{
        throw e;
    })


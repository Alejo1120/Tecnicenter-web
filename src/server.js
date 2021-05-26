   const morgan = require('morgan');
   const cors = require('cors');
   const express = require ('express');
    const path = require ("path");
    const app = express();
    //const router = express.Router;

    const indexrouter = require('../routes/index'); // controlador de rutas

    //definimos puerto 
    const port = process.env.PORT || 5000;
    
    app.use(express.urlencoded({extended:false}));   //entender datos de un formulario
    app.use (express.json());
    //app.use(require ('./routes/index'));
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.static(path.join(__dirname, '../public/')));      //carpeta public de archivos estaticos
    app.use(indexrouter);  // se usa el controlador de rutas

    app.listen(5000,()=>{
        console.log("servidor corriendo en el puerto 5000");

    });
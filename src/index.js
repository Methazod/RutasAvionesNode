// Crear server
import express from 'express';
import bodyParser from "body-parser";
import router from "./routes/grafoRoute.js";
import morgan from 'morgan';
import './models/associations.js';

const app = express();

// Config
app.set('port', process.env.PORT || 3000); // Establecer el puerto
app.set('json spaces', 2); // Coger json de un formato especifico

// set the view engine to ejs
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Rutas / Controladores
app.use(router);

// Inicializar
app.listen(app.get('port'), ()=>{
    console.log(`Server listening on port ${app.get('port')}`)
});
import express from "express";
import { GetCiudades, GetRuta } from "../controllers/grafoController.js";
const router = express.Router();

router.get('/', (req, res) => {    
    res.json(
        {
            "Response": "¡Hola mundo!"
        }
    );
});

router.get('/ciudades', GetCiudades);
router.post('/ruta', GetRuta);

export default router;
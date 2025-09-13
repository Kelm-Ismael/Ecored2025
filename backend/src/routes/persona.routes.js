import express from 'express';
import {
    getPersonas,
    crearPersona,
    getPersona
} from '../controllers/persona.controller.js'
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/todas', getPersonas);
router.post('/nueva', crearPersona);
router.get('/persona', verificarToken, getPersona);

export default router;
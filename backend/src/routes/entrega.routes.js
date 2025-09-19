import express from 'express';
import {
    getEntregas,
    nuevaEntrega, 
    verificarEntrega
} from '../controllers/entrega.controller.js'
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/todas', getEntregas);
router.post('/nueva', verificarToken, nuevaEntrega);
router.get('/verif', verificarEntrega);

export default router;
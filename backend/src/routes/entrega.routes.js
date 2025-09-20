import express from 'express';
import {
    getEntregas,
    nuevaEntrega, 
    verificarEntrega,
    getUltimasEntregasPorId
} from '../controllers/entrega.controller.js'
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/todas', getEntregas);
router.post('/nueva', verificarToken, nuevaEntrega);
router.get('/verif', verificarEntrega);
router.get('/ultimas', verificarToken, getUltimasEntregasPorId);

export default router;
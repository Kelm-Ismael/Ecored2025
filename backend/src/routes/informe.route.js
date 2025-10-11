import express from 'express';
import { 
    getEntregasPorFecha,
    descargarPDFEntregasPorFecha
} from '../controllers/informe.controller.js';
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.post('/entregasPorFecha', verificarToken, getEntregasPorFecha);
router.post('/entregasPorFechaPDF', verificarToken, descargarPDFEntregasPorFecha);

export default router;
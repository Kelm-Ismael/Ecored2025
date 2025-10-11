import express from 'express';
import {
  actualizarEstadoSolicitud,
  getEscuelas,
  getSolicitudesPendientesPorEscuela,
  getSolicitudesPorEscuela,
  solicitarLink
} from '../controllers/escuela.controller.js';
import { verificarToken } from '../utils/jwt.js'

const router = express.Router();

router.get('/todas', getEscuelas);
router.post('/vinculacion', solicitarLink);
router.post('/solicitudes', verificarToken, getSolicitudesPendientesPorEscuela);
router.post('/solicitudesPorEstado', verificarToken, getSolicitudesPorEscuela);
router.post('/actualizarSolicitud', verificarToken, actualizarEstadoSolicitud);

export default router;

import express from 'express';
import {
  getTiposInstitucion
} from '../controllers/institucion.controller.js';
import { verificarToken } from '../utils/jwt.js'

const router = express.Router();

router.get('/tipos', getTiposInstitucion);

export default router;

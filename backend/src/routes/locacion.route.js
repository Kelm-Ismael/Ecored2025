import express from 'express';
import {
    getLocaciones
} from '../controllers/locacion.controller.js'
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/todas', verificarToken,  getLocaciones);

export default router;
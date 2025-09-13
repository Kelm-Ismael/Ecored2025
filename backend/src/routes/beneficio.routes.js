import express from 'express';
import {
    getBeneficios
} from '../controllers/beneficio.controller.js'
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/todos', getBeneficios);

export default router;
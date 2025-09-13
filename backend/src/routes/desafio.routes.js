import express from 'express';
import {
    getDesafios
} from '../controllers/desafio.controller.js'
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/todos', getDesafios);

export default router;
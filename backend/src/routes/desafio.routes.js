<<<<<<< HEAD
import { Router } from 'express';
import { verificarToken } from '../middleware/auth.js';
import {
  getDesafios,
  getMisDesafios,
  postInscribir,
  postConfirmar,
} from '../controllers/desafio.controller.js';

const router = Router();

router.get('/', getDesafios);                    // públicos
router.get('/usuario', verificarToken, getMisDesafios);
router.post('/:id/inscribir', verificarToken, postInscribir);
router.post('/usuario/:id/confirmar', verificarToken, postConfirmar);

export default router;
=======
import express from 'express';
import {
    getDesafios
} from '../controllers/desafio.controller.js'
import { verificarToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/todos', getDesafios);

export default router;
>>>>>>> origin/Caro

import { Router } from 'express';
import { verificarToken } from '../middleware/auth.js';
import {
  getBeneficios,
  getBeneficioById,
  crearBeneficio,
  actualizarBeneficio,
  eliminarBeneficio,
} from '../controllers/beneficio.controller.js';

const router = Router();

router.get('/', getBeneficios);
router.get('/:id', getBeneficioById);

// si sólo admin debe crear/editar/eliminar, rodear con un middleware de rol
router.post('/', verificarToken, crearBeneficio);
router.put('/:id', verificarToken, actualizarBeneficio);
router.delete('/:id', verificarToken, eliminarBeneficio);

export default router;

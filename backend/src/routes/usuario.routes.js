import express from 'express';
import {
  getUsuarios,
  crearUsuario,
  loginUsuario,
  perfilUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuario.controller.js';
import { verificarToken } from '../utils/jwt.js'

const router = express.Router();

router.get('/todos', getUsuarios);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, perfilUsuario);
router.post('/nuevo', crearUsuario);

// router.put('/:id', actualizarUsuario);
// router.delete('/:id', eliminarUsuario);

export default router;

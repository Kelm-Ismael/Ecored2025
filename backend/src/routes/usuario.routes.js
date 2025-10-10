import express from 'express';
import {
  buscarUsuario,
  crearUsuario,
  getUsuarios,
  loginUsuario,
  perfilUsuario,
  actualizarUsuario,
  eliminarUsuario,
  getTiposUsuario,
  crearUsuarioAdmin,
} from '../controllers/usuario.controller.js';
import { verificarToken } from '../utils/jwt.js'

const router = express.Router();

router.get('/todos', getUsuarios);
router.get('/tipos', getTiposUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, perfilUsuario);
router.post('/nuevo', crearUsuario);
router.post('/nuevoFull', crearUsuarioAdmin);
router.get('/buscar', buscarUsuario);

// router.put('/:id', actualizarUsuario);
// router.delete('/:id', eliminarUsuario);

export default router;

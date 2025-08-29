import express from 'express';
import {
  getUsuarios,
  crearUsuario,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuario.controller.js';

const router = express.Router();

router.get('/', getUsuarios);
router.post('/', crearUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;

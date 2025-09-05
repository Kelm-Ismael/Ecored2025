// import express from 'express';
// import {
//   getUsuarios,
//   crearUsuario,
//   actualizarUsuario,
//   eliminarUsuario
// } from '../controllers/usuario.controller.js';

// const router = express.Router();

// router.get('/', getUsuarios);
// router.post('/', crearUsuario);
// router.put('/:id', actualizarUsuario);
// router.delete('/:id', eliminarUsuario);

// export default router;
import express from 'express';
import {
  getUsuarios,
  crearUsuario,
  loginUsuario,
  getPerfil,
  actualizarUsuario,
  eliminarUsuario
} from '../controllers/usuario.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getUsuarios);          // público (puedes protegerlo si quieres)
router.post('/', crearUsuario);        // registro
router.post('/login', loginUsuario);   // login
router.get('/me', verificarToken, getPerfil); // perfil autenticado
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);

export default router;

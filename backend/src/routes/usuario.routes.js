
import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

import {
  getUsuarios,
  crearUsuario,
  loginUsuario,
  getPerfil,
  actualizarUsuario,
  eliminarUsuario,
  putCambiarPassword,
  putActualizarAvatar,
} from '../controllers/usuario.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = Router();

/* ---------- Multer config (disk storage) ---------- */
const AVATAR_DIR = path.join(process.cwd(), 'uploads', 'avatars');
if (!fs.existsSync(AVATAR_DIR)) fs.mkdirSync(AVATAR_DIR, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, AVATAR_DIR),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase() || '.jpg';
    const safeExt = ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? ext : '.jpg';
    cb(null, `u${req.user?.id || 'anon'}_${Date.now()}${safeExt}`);
  },
});
function fileFilter(req, file, cb) {
  const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
  if (!ok) return cb(new Error('Tipo de archivo no permitido'), false);
  cb(null, true);
}
const upload = multer({ storage, fileFilter, limits: { fileSize: 5 * 1024 * 1024 } });

/* -------------------- Rutas públicas -------------------- */
router.post('/', crearUsuario);           // registro
router.post('/login', loginUsuario);      // login

/* -------------------- Rutas protegidas ------------------ */
router.get('/', verificarToken, getUsuarios);
router.get('/me', verificarToken, getPerfil);
router.put('/:id', verificarToken, actualizarUsuario);
router.delete('/:id', verificarToken, eliminarUsuario);

// 🔐 cambiar contraseña
router.put('/me/password', verificarToken, putCambiarPassword);

// 🖼️ actualizar avatar (campo: 'avatar')
router.put('/me/avatar', verificarToken, upload.single('avatar'), putActualizarAvatar);

export default router;

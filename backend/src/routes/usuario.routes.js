// src/routes/usuario.routes.js
import { Router } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';

import {
  buscarUsuario,
  crearUsuario,
  getUsuarios,
  loginUsuario,
  // getPerfil,            // ❌ no existe en el controller
  perfilUsuario,           // ✅ este sí existe
  actualizarUsuario,
  eliminarUsuario,
  putCambiarPassword,
  putActualizarAvatar,
} from '../controllers/usuario.controller.js';

import { verificarToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/roles.js';

const router = Router();

/* ---------- Multer config (disk storage) ---------- */
const AVATAR_DIR = path.join(process.cwd(), 'uploads', 'avatars');
if (!fs.existsSync(AVATAR_DIR)) fs.mkdirSync(AVATAR_DIR, { recursive: true });

const MIME_EXT = {
  'image/jpeg': '.jpg',
  'image/png': '.png',
  'image/webp': '.webp',
  'image/heic': '.heic',
  'image/heif': '.heif',
};

function decideExt(originalname, mimetype) {
  const fromMime = MIME_EXT[mimetype];
  if (fromMime) return fromMime;
  const ext = (path.extname(originalname || '') || '').toLowerCase();
  if (['.jpg', '.jpeg', '.png', '.webp', '.heic', '.heif'].includes(ext)) return ext;
  return '.jpg';
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, AVATAR_DIR),
  filename: (req, file, cb) => {
    const safeExt = decideExt(file.originalname, file.mimetype);
    cb(null, `u${req.user?.id ?? 'anon'}_${Date.now()}${safeExt}`);
  },
});

function fileFilter(req, file, cb) {
  const allowed = [
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/heic',
    'image/heif',
    'application/octet-stream',
  ];
  if (!allowed.includes(file.mimetype)) {
    return cb(new Error('Tipo de archivo no permitido (usa JPG, PNG, WEBP o HEIC/HEIF).'), false);
  }
  cb(null, true);
}

const MAX_MB = Number(process.env.UPLOAD_MAX_MB || 5);
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_MB * 1024 * 1024 },
});

/* -------------------- Rutas públicas -------------------- */
router.post('/', crearUsuario);
router.post('/login', loginUsuario);

/* -------------------- Rutas protegidas ------------------ */
router.get('/', verificarToken, requireAdmin, getUsuarios);
router.get('/me', verificarToken, perfilUsuario);   // ✅ usar perfilUsuario

// CRUD admin
router.put('/:id', verificarToken, requireAdmin, actualizarUsuario);
router.delete('/:id', verificarToken, requireAdmin, eliminarUsuario);

// cambiar contraseña
router.put('/me/password', verificarToken, putCambiarPassword);

// actualizar avatar
router.put(
  '/me/avatar',
  verificarToken,
  (req, res, next) => {
    upload.single('avatar')(req, res, (err) => {
      if (!err) return next();
      if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
          return res.status(413).json({ error: `El archivo supera el máximo de ${MAX_MB}MB` });
        }
        return res.status(400).json({ error: `Error de carga (Multer): ${err.code}` });
      }
      return res.status(400).json({ error: err.message || 'Error al procesar el archivo' });
    });
  },
  putActualizarAvatar
);

// extras
router.get('/perfil', verificarToken, perfilUsuario);
router.post('/nuevo', crearUsuario);
router.get('/buscar', buscarUsuario);

export default router;

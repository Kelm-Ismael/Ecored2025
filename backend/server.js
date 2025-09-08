import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';

import usuarioRoutes from './src/routes/usuario.routes.js';
import qrRoutes from './src/routes/qr.routes.js';

const app = express();

// --- CORS DEV AMIGABLE ---
// En desarrollo lo más práctico es permitir todo (con credenciales)
// En producción conviene limitar a tu dominio front.
app.use(cors({ origin: true, credentials: true }));

// --- Middleware JSON ---
app.use(express.json());

// --- Servir archivos subidos (ej: avatares) ---
// Así desde el front podés usar `${BASE_URL}/uploads/avatars/archivo.png`
const uploadsDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDir));

// --- Rutas API ---
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/qr', qrRoutes);

// --- Healthcheck ---
app.get('/health', (_, res) => {
  res.json({ ok: true, base: process.env.PUBLIC_BASE_URL || null });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  const base = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;
  console.log(`API escuchando en http://0.0.0.0:${PORT}`);
  console.log(`PUBLIC_BASE_URL => ${base}`);
});

import express from 'express';
import cors from 'cors';
import path from 'path';
import 'dotenv/config';
import usuarioRoutes from './src/routes/usuario.routes.js';

const app = express();

// --- CORS DEV AMIGABLE ---
// Podés afinar los origins si querés, pero en dev lo más simple:
app.use(cors({ origin: true, credentials: true }));

app.use(express.json());

// --- SERVIR ARCHIVOS SUBIDOS (avatars) ---
const uploadsDir = path.join(process.cwd(), 'uploads');
app.use('/uploads', express.static(uploadsDir));

// Rutas API
app.use('/api/usuarios', usuarioRoutes);

// Health
app.get('/health', (_, res) => res.json({ ok: true, base: process.env.PUBLIC_BASE_URL || null }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  const base = process.env.PUBLIC_BASE_URL || `http://localhost:${PORT}`;
  console.log(`API escuchando en http://0.0.0.0:${PORT}`);
  console.log(`PUBLIC_BASE_URL => ${base}`);
});

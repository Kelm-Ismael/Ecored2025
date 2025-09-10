
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import db from './src/config/db.js';

import path from 'path';
import { fileURLToPath } from 'url';

// Rutas
import usuarioRoutes from './src/routes/usuario.routes.js';
import beneficioRoutes from './src/routes/beneficio.routes.js';
import desafioRoutes from './src/routes/desafio.routes.js';

// __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());

// Static (avatares, etc.)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoints simples
app.get('/', (req, res) => res.send('¡Servidor funcionando correctamente!'));
app.get('/health', (req, res) => res.json({ ok: true, ts: new Date().toISOString() }));

// Rutas de negocio
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/beneficios', beneficioRoutes);
app.use('/api/desafios', desafioRoutes);

// Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend ejecutándose en http://0.0.0.0:${PORT}`);
  console.log('JWT_SECRET?', process.env.JWT_SECRET);
  console.log('DB_HOST?', process.env.DB_HOST);
});


// ...
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS ahora');
    res.json({ ok: true, ahora: rows[0].ahora });
  } catch (err) {
    console.error(' Error test-db:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});
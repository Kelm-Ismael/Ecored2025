// import express from 'express';
// import dotenv from 'dotenv';

// // importar las rutas de la api
// import usuarioRoutes from './routes/usuario.routes.js';

// dotenv.config();

// // Inicializar la aplicación Express
// const app = express();

// app.use(express.json());

// // Rutas principales agrupadas bajo `/api`
// app.use('/api/usuarios', usuarioRoutes);

// // Puedes agregar aquí más rutas: entregas, beneficios, etc.
// // app.use('/api/entregas', entregaRoutes);

// const PORT = process.env.PORT || 3000
// app.listen(PORT, () => {
//     console.log(`Servidor backend ejecutandose en http://localhost:${PORT}`)
// })

// // para iniciar servidor en git bash -> npm run dev

// // Resultado: CRUD disponible en estas rutas
// // Método	    Ruta	            Función
// // GET	        /api/usuarios	    Obtener todos los usuarios
// // POST	        /api/usuarios	    Crear nuevo usuario
// // PUT	        /api/usuarios/:id	Actualizar usuario
// // DELETE	    /api/usuarios/:id	Eliminar usuario


// import express from 'express';
// import dotenv from 'dotenv';
// import usuarioRoutes from './src/routes/usuario.routes.js';

// dotenv.config();

// const app = express();
// app.use(express.json());

// // Rutas principales
// app.use('/api/usuarios', usuarioRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
// });

// import express from 'express';
// import dotenv from 'dotenv';
// import cors from 'cors';

// import db from './src/config/db.js'; // CORREGIDO
// import usuarioRoutes from './src/routes/usuario.routes.js'; // CORREGIDO

// dotenv.config();

// const app = express();
// app.use(cors());
// app.use(express.json());

// // ✅ Endpoint de prueba de conexión con MySQL
// app.get('/test-db', async (req, res) => {
//   try {
//     const [rows] = await db.query('SELECT 1 + 1 AS resultado');
//     res.json({ ok: true, resultado: rows[0].resultado });
//   } catch (err) {
//     console.error('❌ Error de conexión a MySQL:', err.message);
//     res.status(500).json({ ok: false, error: err.message });
//   }
// });

// // 👉 Montaje de rutas de usuarios
// app.use('/api/usuarios', usuarioRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
// });
// index.js

import express from 'express';
import cors from 'cors';
import 'dotenv/config';

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

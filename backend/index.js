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


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import db from './config/db.js'; // tu pool de MySQL
import usuarioRoutes from './routes/usuario.routes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Endpoint de prueba de conexión con MySQL
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS resultado');
    res.json({ ok: true, resultado: rows[0].resultado });
  } catch (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// 👉 Montaje de rutas de usuarios
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});

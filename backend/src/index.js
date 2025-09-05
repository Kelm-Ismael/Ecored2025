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

import db from './config/db.js'; // tu pool de MySQL

// Endpoint para probar conexión a la DB
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    res.json({ success: true, result: rows[0].result });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});


import express from 'express';
import dotenv from 'dotenv';
import usuarioRoutes from './routes/usuario.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Rutas principales
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
});

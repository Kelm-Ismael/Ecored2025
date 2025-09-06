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

import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Configuración de la base de datos
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'ecored',
};

let db;

// Función para conectar a MySQL
async function conectarDB() {
  try {
    db = await mysql.createConnection(dbConfig);
    console.log('✅ Conectado a MySQL');

    // Inicia el servidor solo si la DB está conectada
    app.listen(PORT, () => {
      console.log(`Servidor backend ejecutándose en http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
    process.exit(1); // Detiene la app si falla la conexión
  }
}

// Llamada para conectar
conectarDB();

// Middleware opcional para usar la conexión db en rutas
app.use((req, res, next) => {
  req.db = db;
  next();
});

// Endpoint raíz
app.get('/', (req, res) => {
  res.send('¡Servidor funcionando correctamente!');
});

// Endpoint de prueba de la DB
app.get('/test-db', async (req, res) => {
  try {
    const [rows] = await req.db.query('SELECT 1 + 1 AS resultado');
    res.json({ ok: true, resultado: rows[0].resultado });
  } catch (err) {
    console.error('❌ Error de conexión a MySQL:', err.message);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Ejemplo de otro endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Test exitoso' });
});

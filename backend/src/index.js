import express from 'express';
import cors from 'cors';//agregado
import dotenv from 'dotenv';
// Inicializar la aplicación Express
const app = express();

app.use(cors());
app.use(express.json());
//-------------------------

// importar las rutas de la api
import usuarioRoutes from './routes/usuario.routes.js';

dotenv.config();

app.use(express.json());

// Rutas principales agrupadas bajo `/api`
app.use('/api/usuarios', usuarioRoutes);

// Puedes agregar aquí más rutas: entregas, beneficios, etc.
// app.use('/api/entregas', entregaRoutes);

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor backend ejecutandose en http://localhost:${PORT}`)
})

// para iniciar servidor en git bash -> npm run dev

// Resultado: CRUD disponible en estas rutas
// Método	    Ruta	            Función
// GET	        /api/usuarios	    Obtener todos los usuarios
// POST	        /api/usuarios	    Crear nuevo usuario
// PUT	        /api/usuarios/:id	Actualizar usuario
// DELETE	    /api/usuarios/:id	Eliminar usuario
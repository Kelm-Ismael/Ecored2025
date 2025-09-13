import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { FRONT_URL } from './config/front.js'

// rutas de la api
import usuarioRoutes from './routes/usuario.routes.js';
import personaRoutes from './routes/persona.routes.js';

dotenv.config();

// Inicializar la aplicación Express
const app = express();

app.use(express.json());

// configurar CORS
app.use(cors({
  origin: `${FRONT_URL}`,  // Cambia al dominio/puerto de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  credentials: true,  // Si usas cookies o autenticación que requiera credenciales
}));

// Rutas principales agrupadas bajo `/api`
app.use('/usuarios', usuarioRoutes);
app.use('/personas', personaRoutes);

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
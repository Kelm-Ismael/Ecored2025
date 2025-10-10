import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { FRONT_URL } from './config/front.js'

// rutas de la api
import usuarioRoutes from './routes/usuario.routes.js';
import personaRoutes from './routes/persona.routes.js';
import beneficioRoutes from './routes/beneficio.routes.js';
import desafioRoutes from './routes/desafio.routes.js'
import residuoRoutes from './routes/residuo.routes.js'
import entregaRoutes from './routes/entrega.routes.js'
import locacionRoutes from './routes/locacion.route.js'
import informesRoutes from './routes/informe.route.js'
import institucionesRoutes from './routes/institucion.route.js'
dotenv.config();

// Inicializar la aplicación Express
const app = express();

app.use(express.json());

// configurar CORS
const allowedOrigins = [
  'http://localhost:8081',
  `${FRONT_URL}`,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));

// Rutas principales agrupadas bajo `/api`
app.use('/usuarios', usuarioRoutes);
app.use('/personas', personaRoutes);
app.use('/beneficios', beneficioRoutes);
app.use('/desafios', desafioRoutes);
app.use('/residuos', residuoRoutes);
app.use('/entregas', entregaRoutes);
app.use('/locaciones', locacionRoutes);
app.use('/informes', informesRoutes);
app.use('/institucion', institucionesRoutes);

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
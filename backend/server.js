// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// const usuarioRoutes = require('./routes/usuarioRoutes');

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use('/api/usuarios', usuarioRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


// import express from 'express';
// import cors from 'cors';
// import connectDB from './src/config/db.js';
// import usuarioRoutes from './src/routes/usuario.routes.js'; // cuidado con la extensión .js

// const app = express();
// connectDB();

// app.use(cors());
// app.use(express.json());

// app.use('/api/usuarios', usuarioRoutes);

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import usuarioRoutes from './src/routes/usuario.routes.js';

const app = express();

app.use(cors({
  origin: [
    'http://localhost:19006',   // Expo web
    'http://127.0.0.1:19006',
    'http://192.168.0.7:19006', // Expo en LAN (ajusta a tu IP)
  ],
  credentials: true,
}));

app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

app.get('/health', (_, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API escuchando en http://0.0.0.0:${PORT}`);
});
    
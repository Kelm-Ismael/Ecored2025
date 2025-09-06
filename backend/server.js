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


import express from 'express';
import cors from 'cors';
import connectDB from './src/config/db.js';
import usuarioRoutes from './src/routes/usuario.routes.js'; // cuidado con la extensión .js

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));

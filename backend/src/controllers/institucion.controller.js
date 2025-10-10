import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken, verificarToken } from '../utils/jwt.js';
import db from '../config/db.js';
import {  obtenerTiposInstitucion, insertarInstitucion } from '../models/institucion.model.js'

export async function getTiposInstitucion(req, res) {
  try {
    const tiposInstitucion = await obtenerTiposInstitucion();
    res.json(tiposInstitucion);
  } catch (err) {
    console.error('Error al obtener tipos de institucion:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// export async function crearInstitucion(req, res) {
//   try {
//     let institucion = { conn, nombre, id_tipo_institucion, cuit_cuil} = req.body;

//     if (!nombre || !id_tipo_institucion || !cuit_cuil ) {
//         return res.status(400).json({ error: 'Nombre, id_tipo_institucion y cuit_cuil son requeridos' });
//     }
//     const nuevoId = await insertarInstitucion(conn, institucion);
//     res.json(nuevoId);
//   } catch (err) {
//     console.error('Error al insertar institucion:', err);
//     res.status(500).json({ error: 'Error interno del servidor' });
//   }
// }

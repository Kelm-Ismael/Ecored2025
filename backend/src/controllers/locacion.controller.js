import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken } from '../utils/jwt.js';
import {
    obtenerLocaciones
} from '../models/locacion.model.js'

export async function getLocaciones(req, res) {
    try {
        const locaciones = await obtenerLocaciones();
        res.json(locaciones);
    } catch (err) {
        console.error('Error al obtener locaciones:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
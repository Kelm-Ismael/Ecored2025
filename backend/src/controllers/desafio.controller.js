import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken } from '../utils/jwt.js';
import {
    obtenerDesafios
} from '../models/desafio.model.js'

export async function getDesafios(req, res) {
    try {
        const desafios = await obtenerDesafios();
        res.json(desafios);
    } catch (err) {
        console.error('Error al obtener desafios:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

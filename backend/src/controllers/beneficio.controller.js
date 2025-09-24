import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken } from '../utils/jwt.js';
import {
    obtenerBeneficios
} from '../models/beneficio.model.js'

export async function getBeneficios(req, res) {
    try {
        const beneficios = await obtenerBeneficios();
        res.json(beneficios);
    } catch (err) {
        console.error('Error al obtener beneficios:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
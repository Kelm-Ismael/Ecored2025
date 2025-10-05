import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken } from '../utils/jwt.js';
import {
    obtenerBeneficioDetalle,
    obtenerBeneficios,
    obtenerPuntosRequeridos
} from '../models/beneficio.model.js'
import pool from '../config/db.js';
import { restarPuntosUsuario } from '../models/usuario.model.js';

export async function getBeneficios(req, res) {
    try {
        const beneficios = await obtenerBeneficios();
        res.json(beneficios);
    } catch (err) {
        console.error('Error al obtener beneficios:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function canjearBeneficio(req, res) {
    const { id_usuario, id_beneficio } = req.body;
    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();
        const beneficio = await obtenerBeneficioDetalle(id_beneficio);
        const puntos_requeridos = await obtenerPuntosRequeridos(id_beneficio);
        const puntos_usuario = await obtenerPuntosRequeridos(id_usuario);

        if (puntos_usuario < puntos_requeridos) {
            console.warn('⚠️ El usuario no tine los puntos suficientes para realizar este canje');
            return res.status(409).json({ error: 'puntos insuficientes' });
        } else {
            const updated = await restarPuntosUsuario(connection, id_usuario, puntos_requeridos);

            if (updated === 0) {
                console.warn(`⚠️ No se actualizó ningún usuario con ID ${id_usuario}`);
            }
        }

        await connection.commit();
        
        res.status(201).json({
            message: 'Beneficio adquirido',
            beneficioObtenido: beneficio,
            puntosRestados: puntos_requeridos
        });
    } catch (err) {
        console.error('❌ Error al canjear el beneficio:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
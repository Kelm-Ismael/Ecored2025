import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken } from '../utils/jwt.js';
import {
    obtenerEntregas,
    insertarEntrega,
    insertarDetalleEntrega,
    obtenerEntregaPorFechaYUsuarios,
    ultimasEntregasPorUsuarioID,
    ultimasEntregasPorLocacionID,
    detallePorIdEntrega
} from '../models/entrega.model.js'
import { sumarPuntosEscuela, sumarPuntosUsuario } from '../models/usuario.model.js';
import pool from '../config/db.js';
import { DEFAULT_ID_LOCACION, DEFAULT_ID_TIPO_LOCACION } from '../utils/constants.js';
import { error } from 'console';
import { buscarInstitucionPorIdUsuario } from '../models/institucion.model.js';



export async function getEntregas(req, res) {
    try {
        const entregas = await obtenerEntregas();
        res.json(entregas);
    } catch (err) {
        console.error('Error al obtener entregas:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function nuevaEntrega(req, res) {
    const { fecha, id_usuario, id_receptor, tipo_usuario, detalle, id_locacion, id_tipo_locacion, total_puntos } = req.body;
    
    if (req.usuario.id_usuario !== id_usuario) {
        return res.status(403).json({ error: 'No estás autorizado para registrar esta entrega.' });
    }

    if (!id_usuario || !id_receptor || !fecha) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    if (!detalle || !Array.isArray(detalle) || detalle.length === 0) {
        return res.status(400).json({ error: 'El detalle de la entrega es obligatorio' });
    }

    const connection = await pool.getConnection();
    
    try {
        await connection.beginTransaction();

        const locacion = id_locacion ?? DEFAULT_ID_LOCACION;
        const tipoLocacion = id_tipo_locacion ?? DEFAULT_ID_TIPO_LOCACION;

        const id_entrega = await insertarEntrega(connection, fecha, id_usuario, id_receptor, locacion, tipoLocacion)

        const detalleIds = await Promise.all(
            detalle.map(item => {
                const tipo = typeof item.tipo === 'object' ? item.tipo.id : item.tipo;
                return insertarDetalleEntrega(connection, id_entrega, tipo, item.cantidad, item.puntos);
            })
        );

        console.log('📦 Detalles insertados con IDs:', detalleIds);
        console.log('✅ Entrega registrada con ID:', id_entrega);

        const updated = await sumarPuntosUsuario(connection, id_usuario, total_puntos);
        if (updated === 0) {
            console.warn(`⚠️ No se actualizó ningún usuario con ID ${id_usuario}`);
        }

        if (tipo_usuario === 'alumno') {
            const institucion = await buscarInstitucionPorIdUsuario(connection, id_usuario);
            console.log('institucion: ', institucion);
            const id_escuela = institucion.id;
            const updated = await sumarPuntosEscuela(connection, id_escuela, total_puntos);
            if (updated === 0) {
                console.warn(`⚠️ No se actualizó ninguna institución (ID ${id_escuela})`);
            } else {
                console.log(`✅ Se sumaron ${total_puntos} puntos a la institución (ID ${id_escuela})`);
            }
        }

        await connection.commit();
        
        res.status(201).json({
            message: 'Entrega registrada exitosamente',
            id_entrega,
            detalleIds,
            puntosSumados: total_puntos
        });
    } catch (err) {
        console.error('❌ Error al registrar la entrega:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}


export async function verificarEntrega(req, res) {
    const { fecha, id_usuario, id_receptor } = req.query;

    if (!fecha || !id_usuario || !id_receptor) {
        return res.status(400).json({ error: 'Faltan parámetros' });
    }

    try {
        const entrega = await obtenerEntregaPorFechaYUsuarios(fecha, id_usuario, id_receptor);
        if (entrega) {
            res.json({ registrada: true, id_entrega: entrega.id });
        } else {
            res.json({ registrada: false });
        }
    } catch (err) {
        console.error('Error verificando entrega:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function getUltimasEntregasPorId(req, res) {
   const id_usuario = req.usuario?.id_usuario;

    if (!id_usuario) {
        return res.status(401).json({ error: 'Usuario no autenticado' });
    }

    try {
        const ultimasEntregas = await ultimasEntregasPorUsuarioID(id_usuario);
        if (ultimasEntregas) {
            res.json(ultimasEntregas);
        } else {
            res.status(404).json({ error: 'No se encontraron entregas' });
        }
    } catch (err) {
        console.error('Error buscando entregas por id:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function getUltimasEntregasPorLocacion(req, res) {
    const locacion = req.query.id_locacion || DEFAULT_ID_LOCACION;

    try {
        const ultimasEntregas = await ultimasEntregasPorLocacionID(locacion);
        if (ultimasEntregas) {
            res.json(ultimasEntregas);
        } else {
            res.status(404).json({ error: 'No se encontraron entregas' });
        }
    } catch (err) {
        console.error('Error buscando entregas por id:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function getDetallesDeEntregaPorId(req, res) {
    const id_entrega = req.query.id_entrega;

    try {
        const detalles = await detallePorIdEntrega(id_entrega);
        if (detalles) {
            res.json(detalles);
        } else {
            res.status(404).json({ error: 'no se encontraron detalles' });
        }
    } catch (err) {
        console.error('Error buscando detalles de la entrega: ', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
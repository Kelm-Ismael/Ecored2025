import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken, verificarToken } from '../utils/jwt.js';
import db from '../config/db.js';
import { 
    obtenerEscuelas, 
    obtenerSolicitudesPorEscuela, 
    responderSolicitud, 
    solicitarAsociacion, 
    verificarSolicitud 
} from '../models/escuela.model.js'
import { actualizarTipoUsuario } from '../models/usuario.model.js';

export async function getEscuelas(req, res) {
  try {
    const escuelas = await obtenerEscuelas();
    res.json(escuelas);
  } catch (err) {
    console.error('Error al obtener escuelas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function getSolicitudesPorEscuela(req, res) {
  try {
    const { id_escuela } = req.body;

    if (!id_escuela) {
      return res.status(400).json({ error: 'Falta el id de la escuela' });
    }

    const solicitudes = await obtenerSolicitudesPorEscuela(id_escuela);
    res.json(solicitudes);
  } catch (err) {
    console.error('Error al obtener solicitudes:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function solicitarLink(req, res) {
    const { id_usuario, id_institucion } = req.body;
    
    if ( !id_usuario || !id_institucion) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }
    
    try {
        const solicitudExistente = await verificarSolicitud(id_usuario);
        if (solicitudExistente) {
            return res.status(409).json({ error: 'Ya enviaste una solicitud a una escuela. No podés enviar otra.' });
        }

        const asociacion = await solicitarAsociacion({ id_usuario, id_institucion });
        if (!asociacion) {
            return res.status(401).json({ error: 'Error al solicitar asociacion' });
        }

        res.status(201).json({
            mensaje: 'Solicitud enviada con éxito.',
            id_solicitud: asociacion,
            id_usuario,
            id_institucion
        });

    } catch (err) {
        console.error('❌ Error al solicitar link a institucion:', err, JSON.stringify(err, Object.getOwnPropertyNames(err)));
        res.status(500).json({
            error: 'Error interno del servidor',
            detalle: err.message,
            stack: err.stack
        });
    }
}

export async function actualizarEstadoSolicitud(req, res) {
    const {id_usuario, id_institucion, estado, notas} = req.body;

    if (!id_usuario || !id_institucion) {
        return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    const estadosPermitidos = ['aceptado', 'rechazado'];
    if (!estadosPermitidos.includes(estado)) {
        return res.status(400).json({ error: 'Estado inválido' });
    }

    const respuesta = {id_usuario, id_institucion, estado, notas,}

    try {
    const result = await responderSolicitud(respuesta);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (estado === 'aceptado') {
      const ID_TIPO_ALUMNO = 2; 
      await actualizarTipoUsuario(id_usuario, ID_TIPO_ALUMNO);
    }

    return res.status(200).json({ mensaje: `Solicitud ${estado} correctamente` });
  } catch (err) {
    console.error('❌ Error al actualizar estado de solicitud:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
}
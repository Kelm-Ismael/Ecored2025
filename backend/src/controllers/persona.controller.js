import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken } from '../utils/jwt.js';
import db from '../config/db.js';
import {
    obtenerPersonas,
    insertarPersona
} from '../models/persona.model.js';
import { buscarPersonaPorDni } from '../models/persona.model.js';
import { error } from 'console';

export async function getPersonas(req, res) {
  try {
    const personas = await obtenerPersonas();
    res.json(personas);
  } catch (err) {
    console.error('Error al obtener personas:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function crearPersona(req, res) {
    try {
        let persona = { nombre, apellido, dni, fecha_nacimiento, id_tipo_persona = 1} = req.body;

        if (!nombre || !apellido || !dni || !fecha_nacimiento ) {
            return res.status(400).json({ error: 'Email y contraseña son requeridos' });
        }

        const personaRegistrada = await buscarPersonaPorDni(dni);
        if (personaRegistrada)
            return res.status(409).json({error: 'Dni ya registrado'});

        const nuevoId = await insertarPersona(persona);

        //generar token
        const token = firmarToken({id: nuevoId});

        res.status(201).json({ 
        mensaje: 'Persona creada',
        id_persona: nuevoId,
        token,
        tipo_persona: persona.tipo_persona
        });
    } catch (err) {
        console.error('Error al crear usuario:', err);
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'DNI ya registrado' });
        }
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

export async function getPersona(req, res) {
    try {
        const persona = await buscarPersonaPorRefUsuario(req.usuario.id_referencia);
        if (!persona) return res.status(404).json({ error: 'Persona no encontrada' });
        res.json(persona);
    } catch (err) {
        console.error('Error en getPersona controller:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
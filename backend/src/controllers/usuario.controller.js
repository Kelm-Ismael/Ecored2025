import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { firmarToken, verificarToken } from '../utils/jwt.js';
import db from '../config/db.js';
import { 
  obtenerUsuarios, 
  buscarUsuarioPorEmail, 
  buscarUsuariosPorQuery,
  editarUsuario, 
  borrarUsuario, 
  obtenerPerfilDetallado, 
  insertarUsuarioCiudadano
} from '../models/usuario.model.js';
import { 
  buscarPersonaPorRefUsuario,
  buscarPersonaPorDni,
  insertarPersona
} from '../models/persona.model.js';

// GET todos
export async function getUsuarios(req, res) {
  try {
    const usuarios = await obtenerUsuarios();
    res.json(usuarios);
  } catch (err) {
    console.error('Error al obtener usuarios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// LOGIN
export async function loginUsuario(req, res) {
  try {
    const { email, contrasenia } = req.body;
    
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    // verificar contrasenia con hash
    // const ok = await bcrypt.compare(contrasenia, usuario.contrasenia_hash);
    // if (!ok) {
    //   return res.status(401).json({ error: 'Credenciales inválidas' });
    // }

    const hashDb = usuario.contrasenia_hash;
    let ok = false;

    // Detectar si la contraseña en la DB ya está hasheada
    if (
      typeof hashDb === 'string' &&
      (hashDb.startsWith('$2a$') || hashDb.startsWith('$2b$') || hashDb.startsWith('$2y$'))
    ) {
      // Comparar usando bcrypt (modo producción)
      ok = await bcrypt.compare(contrasenia, hashDb);
    } else {
      // Comparación directa (modo testing - texto plano)
      ok = contrasenia === hashDb;
    }

    if (!ok) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = firmarToken({ id: usuario.id });
    
    res.json({ 
      token, 
      id_usuario: usuario.id,
      id_tipo_usuario: usuario.id_tipo_usuario,
      id_referencia: usuario.id_referencia
    });

  } catch (err) {
    console.error('Error al iniciar sesión:', err);
    
    if (err.message === 'CONFIG_JWT_SECRET_MISSING') {
      return res.status(500).json({ error: 'Falta JWT_SECRET en .env' });
    }
    
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// PERFIL
export async function perfilUsuario(req, res) {
  try {
    const usuario = await obtenerPerfilDetallado(req.usuario.id_usuario);
    if (!usuario) return res.status(404).json({ error: 'Usuario no encontrado' });

    let datosReferencia = {};
    
    switch (usuario.id_tipo_usuario) {
      case 1: // ciudadano
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia);
        break;
      case 2: // alumno
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia)
        break;
      case 3: // empleado
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia)
        break;
      case 4: // administrador
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia)
        break;
      case 5: // escuela
        //
        break;
      default:
        console.warn('⚠️ Tipo de usuario no manejado:', usuario.id_tipo_usuario);
        break;
    }
    
    res.json({
      ...usuario,
      referencia: datosReferencia,
    });
    
    // res.json(usuario);
  } catch (err) {
    console.error('Error al obtener perfil:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// POST nuevo (SIN PROBAR)
export async function crearUsuario(req, res) {
  try {
    const {
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      email,
      contrasenia,
    } = req.body;

    console.log('✅ Datos recibidos:', req.body);
    // TODO if superadmin habilitar creacion con tipo
    
    if (!email || !contrasenia || !nombre || !apellido || !dni || !fechaNacimiento) {
      console.warn('⚠️ Faltan datos obligatorios');
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    // verificar existencia de email
    console.log('🔍 Buscando usuario por email...');
    const usuarioExistente = await buscarUsuarioPorEmail(email);
    if (usuarioExistente) {
      console.warn('⚠️ Email ya registrado');
      return res.status(409).json({ error: 'Email ya registrado' });
    }

    // verificar existencia de dni
    console.log('🔍 Buscando persona por DNI...');
    const personaExistente = await buscarPersonaPorDni(dni);
    if (personaExistente) {
      console.warn('⚠️ DNI ya registrado');
      return res.status(409).json({ error: 'DNI ya registrado' });
    }

    // insertar nueva persona
    console.log('📥 Insertando nueva persona...');
    const nuevaPersonaId = await insertarPersona({
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      id_tipo_persona: 1
    });
    console.log('✅ Persona insertada con ID:', nuevaPersonaId);

    // insertar nuevo usuario
    console.log('📥 Insertando nuevo usuario...');
    const nuevoUsuarioId = await insertarUsuarioCiudadano({
      email,
      contrasenia,
      id_referencia: nuevaPersonaId
    });
    console.log('✅ Usuario insertado con ID:', nuevoUsuarioId);
    
    //generar token
    console.log('🔐 Generando token...');
    const token = firmarToken({id: nuevoUsuarioId});

    // devolver token e id
    console.log('🚀 Usuario creado exitosamente');
    res.status(201).json({ 
      mensaje: 'Usuario creado exitosamente',
      id_usuario: nuevoUsuarioId,
      token,
      tipo_usuario: 'ciudadano'
    });

  } catch (err) {
    console.error('❌ Error al crear usuario:', err, JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message,
      stack: err.stack // solo en desarrollo
    });
  }
}

export async function buscarUsuario(req, res) {
  const { q } = req.query;

  console.log('Buscar usuario con query:', q);
  if (!q) {
    return res.status(400).json({ error: 'Falta el parámetro de búsqueda' });
  }

  try {
    const resultados = await buscarUsuariosPorQuery(q);
    console.log('Resultados encontrados:', resultados.length);
    res.json(resultados);
  } catch (error) {
    console.error('❌ Error al buscar usuarios:', error);
    res.status(500).json({ error: 'Error al buscar usuarios' });
  }
}


// PUT editar (SIN PROBAR)
export async function actualizarUsuario(req, res) {
  try {
    const { id } = req.params;
    const datos = req.body;
    await editarUsuario(id, datos);
    res.json({ mensaje: 'Usuario actualizado' });
  } catch (err) {
    console.error('Error al actualizar usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// DELETE eliminar (SIN PROBAR)
export async function eliminarUsuario(req, res) {
  try {
    const { id } = req.params;
    await borrarUsuario(id);
    res.json({ mensaje: 'Usuario eliminado' });
  } catch (err) {
    console.error('Error al eliminar usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}
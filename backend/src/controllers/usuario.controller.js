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
  insertarUsuarioCiudadano,
  obtenerTiposUsuario,
  insertarUsuarioPorTipo,
} from '../models/usuario.model.js';
import { 
  buscarPersonaPorRefUsuario,
  buscarPersonaPorDni,
  insertarPersona,
  insertarPersonaCompleto
} from '../models/persona.model.js';
import {
  buscarInstitucionPorCuitCuil,
  buscarInstitucionPorRefUsuario,
  insertarInstitucion,
} from '../models/institucion.model.js';
import pool from '../config/db.js';

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

export async function getTiposUsuario(req, res) {
  try {
    const tiposUsuario = await obtenerTiposUsuario();
    res.json(tiposUsuario);
  } catch (err) {
    console.error('Error al obtener tipos de usuario:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

// LOGIN
export async function loginUsuario(req, res) {
  const connection = await pool.getConnection();

  try {
    const { email, contrasenia } = req.body;
    
    if (!email || !contrasenia) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
    
    const usuario = await buscarUsuarioPorEmail(connection, email);
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
  } finally {
    connection.release();
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
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia);
        break;
      case 3: // empleado
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia);
        break;
      case 4: // administrador
        datosReferencia = await buscarPersonaPorRefUsuario(usuario.id_referencia);
        break;
      case 5: // escuela
        datosReferencia = await buscarInstitucionPorRefUsuario(usuario.id_referencia);
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

export async function crearUsuario(req, res) {
  const connection = await pool.getConnection();

  try {
    const { nombre, apellido, dni, fechaNacimiento, email, contrasenia } = req.body;

    console.log('✅ Datos recibidos:', req.body);

    if (!email || !contrasenia || !nombre || !apellido || !dni || !fechaNacimiento) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    await connection.beginTransaction();

    console.log('🔍 Buscando usuario por email...');
    const usuarioExistente = await buscarUsuarioPorEmail(connection, email);
    if (usuarioExistente) {
      await connection.rollback();
      return res.status(409).json({ error: 'Email ya registrado' });
    }

    console.log('🔍 Buscando persona por DNI...');
    const personaExistente = await buscarPersonaPorDni(connection, dni);
    if (personaExistente) {
      await connection.rollback();
      return res.status(409).json({ error: 'DNI ya registrado' });
    }

    console.log('📥 Insertando nueva persona...');
    const nuevaPersonaId = await insertarPersona(connection, {
      nombre,
      apellido,
      dni,
      fechaNacimiento,
      id_tipo_persona: 1
    });
    console.log('✅ Persona insertada con ID:', nuevaPersonaId);

    console.log('📥 Insertando nuevo usuario...');
    const nuevoUsuarioId = await insertarUsuarioCiudadano(connection, {
      email,
      contrasenia,
      id_referencia: nuevaPersonaId
    });
    console.log('✅ Usuario insertado con ID:', nuevoUsuarioId);

    await connection.commit();

    console.log('🔐 Generando token...');
    const token = firmarToken({ id: nuevoUsuarioId });

    console.log('🚀 Usuario creado exitosamente');
    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      id_usuario: nuevoUsuarioId,
      token,
      tipo_usuario: 'ciudadano'
    });

  } catch (err) {
    await connection.rollback();
    console.error('❌ Error al crear usuario:', err, JSON.stringify(err, Object.getOwnPropertyNames(err)));
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message,
      stack: err.stack
    });
  } finally {
    connection.release();
  }
}

export async function crearUsuarioAdmin(req, res) {
  const connection = await pool.getConnection();

  try {
    const { nombre, apellido, dni, fecha_nacimiento, email, cuit_cuil, sexo, tipo_usuario, id_tipo_usuario, id_tipo_persona, id_tipo_institucion, usuario_creador, is_super_admin } = req.body;

    console.log('✅ Datos recibidos:', req.body);

    if (!email || !nombre || !cuit_cuil || !tipo_usuario || !id_tipo_usuario) {
      return res.status(400).json({ error: 'Faltan datos obligatorios' });
    }

    await connection.beginTransaction();

    const usuarioExistente = await buscarUsuarioPorEmail(connection, email);
    if (usuarioExistente) {
      await connection.rollback();
      return res.status(409).json({ error: 'Email ya registrado' });
    }

    let idReferencia = null;
    const tipoUsuario = tipo_usuario.toLowerCase();

    if (tipoUsuario === 'escuela') {
      if (!id_tipo_institucion) {
        await connection.rollback();
        return res.status(400).json({ error: 'Falta tipo de institución para escuela' });
      }

      const institucionExistente = await buscarInstitucionPorCuitCuil(connection, cuit_cuil);
      if (institucionExistente) {
        await connection.rollback();
        return res.status(409).json({ error: 'CUIT/CUIL ya registrado' });
      }

      // insert institucion
      console.log('🏫 Insertando nueva institución...');
      idReferencia = await insertarInstitucion(connection, {
        nombre,
        id_tipo_institucion,
        cuit_cuil
      });
      console.log('✅ Institución creada con ID:', idReferencia);

    } else {
      if (!apellido || !dni || !fecha_nacimiento || !id_tipo_persona) {
        await connection.rollback();
        return res.status(400).json({ error: 'Faltan datos de persona' });
      }

      const personaExistente = await buscarPersonaPorDni(connection, dni);
      if (personaExistente) {
        await connection.rollback();
        return res.status(409).json({ error: 'DNI ya registrado' });
      }

      // insert persona
      console.log('👤 Insertando nueva persona...');
      idReferencia = await insertarPersonaCompleto(connection, {
        nombre,
        apellido,
        dni,
        fechaNacimiento: fecha_nacimiento,
        cuit_cuil,
        sexo,
        id_tipo_persona
      });
      console.log('✅ Persona creada con ID:', idReferencia);
    }

    let contrasenia;

    if (tipoUsuario === 'escuela') {
      contrasenia = cuit_cuil;
    } else {
      contrasenia = dni;
    }

    // insert user
    console.log('🔐 Insertando nuevo usuario...');
    
    if (tipoUsuario === 'administrador' && typeof is_super_admin === 'undefined') {
      return res.status(400).json({ error: 'Falta valor de is_super_admin para administrador' });
    }

    const isSuperAdminFinal = tipoUsuario === 'administrador' ? (is_super_admin ? 1 : 0) : 0;

    const nuevoUsuarioId = await insertarUsuarioPorTipo(connection, {
      email,
      contrasenia,
      id_tipo_usuario,
      id_referencia: idReferencia,
      usuario_creador,
      is_super_admin: isSuperAdminFinal
    });
    console.log('✅ Usuario insertado con ID:', nuevoUsuarioId);

    await connection.commit();

    const token = firmarToken({ id: nuevoUsuarioId });

    res.status(201).json({
      mensaje: 'Usuario creado exitosamente',
      id_usuario: nuevoUsuarioId,
      token,
      tipo_usuario
    });

  } catch (err) {
    await connection.rollback();
    console.error('❌ Error al crear usuario:', err);
    res.status(500).json({
      error: 'Error interno del servidor',
      detalle: err.message,
      stack: err.stack
    });
  } finally {
    connection.release();
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
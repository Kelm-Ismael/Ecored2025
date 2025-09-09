// backend/src/models/usuario.model.js
import db from '../config/db.js';
import bcrypt from 'bcrypt';

// Listado básico (ej. administración)
export async function obtenerUsuarios() {
  const [rows] = await db.query(
    `SELECT id, email, id_tipo_usuario, id_referencia, estado 
     FROM usuario`
  );
  return rows;
}

// Crear usuario con hash (respeta id_tipo_usuario)
export async function insertarUsuario({ email, contrasenia, id_tipo_usuario = 1, id_referencia = null }) {
  const hash = await bcrypt.hash(contrasenia, 10);
  const [result] = await db.query(
    `INSERT INTO usuario (email, contrasenia_hash, id_tipo_usuario, id_referencia) 
     VALUES (?, ?, ?, ?)`,
    [email, hash, id_tipo_usuario, id_referencia]
  );
  return result.insertId;
}

// Buscar por email (para login/validaciones)
export async function buscarUsuarioPorEmail(email) {
  const [rows] = await db.query(`SELECT * FROM usuario WHERE email = ?`, [email]);
  return rows[0];
}

// Buscar por id (básico)
export async function buscarUsuarioPorId(id) {
  const [rows] = await db.query(
    `SELECT id, email, id_tipo_usuario, id_referencia, estado 
     FROM usuario WHERE id = ?`,
    [id]
  );
  return rows[0];
}

// Editar (mínimo)
export async function editarUsuario(id, datos) {
  const { email, estado } = datos;
  await db.query(
    `UPDATE usuario SET email = ?, estado = ? WHERE id = ?`,
    [email, estado, id]
  );
}

// Eliminar
export async function borrarUsuario(id) {
  await db.query(`DELETE FROM usuario WHERE id = ?`, [id]);
}

// Hash actual para validar cambio de contraseña
export async function obtenerHashPorId(id) {
  const [rows] = await db.query(
    `SELECT contrasenia_hash FROM usuario WHERE id = ?`,
    [id]
  );
  return rows[0]?.contrasenia_hash || null;
}

// Actualizar contraseña (recibe hash ya generado)
export async function actualizarPasswordUsuario(id, nuevoHash) {
  await db.query(
    `UPDATE usuario SET contrasenia_hash = ? WHERE id = ?`,
    [nuevoHash, id]
  );
}

// Actualizar URL de foto de perfil
export async function actualizarFotoUrl(id, url) {
  await db.query(
    `UPDATE usuario SET foto_url = ? WHERE id = ?`,
    [url, id]
  );
}

// Sumar puntos
export async function sumarPuntosUsuario(id, puntos) {
  await db.query(
    `UPDATE usuario
     SET puntos_acumulados = COALESCE(puntos_acumulados, 0) + ?
     WHERE id = ?`,
    [puntos, id]
  );
}

// PERFIL DETALLADO (incluye id_tipo_usuario y texto)
export async function obtenerPerfilDetallado(id) {
  const [rows] = await db.query(
    `SELECT u.id,
            u.email,
            u.puntos_acumulados,
            u.foto_url,
            u.fecha_creacion,
            u.id_tipo_usuario,
            tu.tipo_usuario
     FROM usuario u
     LEFT JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id
     WHERE u.id = ?`,
    [id]
  );
  return rows[0];
}

export async function listarUsuariosPaginado({ q = '', page = 1, pageSize = 20, tipo = null, estado = null }) {
  page = Math.max(1, Number(page) || 1);
  pageSize = Math.min(100, Math.max(1, Number(pageSize) || 20));
  const offset = (page - 1) * pageSize;

  const params = [];
  const where = [];

  if (q) {
    where.push(`(u.email LIKE ? OR tu.tipo_usuario LIKE ?)`);
    params.push(`%${q}%`, `%${q}%`);
  }
  if (tipo) {
    where.push(`u.id_tipo_usuario = ?`);
    params.push(Number(tipo));
  }
  if (estado !== null && estado !== undefined && estado !== '') {
    where.push(`u.estado = ?`);
    params.push(Number(estado));
  }

  const whereSql = where.length ? `WHERE ${where.join(' AND ')}` : '';

  const [rows] = await db.query(
    `SELECT u.id, u.email, u.id_tipo_usuario, tu.tipo_usuario, u.estado, u.puntos_acumulados,
            u.fecha_creacion, u.is_super_admin
     FROM usuario u
     LEFT JOIN tipo_usuario tu ON tu.id = u.id_tipo_usuario
     ${whereSql}
     ORDER BY u.id DESC
     LIMIT ${pageSize} OFFSET ${offset}`,
    params
  );

  const [countRows] = await db.query(
    `SELECT COUNT(*) as total
     FROM usuario u
     LEFT JOIN tipo_usuario tu ON tu.id = u.id_tipo_usuario
     ${whereSql}`,
    params
  );

  return { items: rows, total: countRows[0].total, page, pageSize };
}

export async function actualizarTipoEstadoUsuario(id, { id_tipo_usuario = null, estado = null }) {
  const sets = [];
  const params = [];

  if (id_tipo_usuario != null) {
    sets.push(`id_tipo_usuario = ?`);
    params.push(Number(id_tipo_usuario));
  }
  if (estado != null) {
    sets.push(`estado = ?`);
    params.push(Number(estado));
  }
  if (!sets.length) return;

  params.push(Number(id));
  await db.query(`UPDATE usuario SET ${sets.join(', ')} WHERE id = ?`, params);
}


export async function setSuperAdmin(id, isSuper) {
  await db.query(`UPDATE usuario SET is_super_admin = ? WHERE id = ?`, [isSuper ? 1 : 0, Number(id)]);
}

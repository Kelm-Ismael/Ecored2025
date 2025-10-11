import db from '../config/db.js';

export async function obtenerUsuarios() {
  const [rows] = await db.query(`SELECT * FROM usuario`); //consulta sql va entre las comillas
  return rows;
}

// usado en crearusuario desde app
export async function insertarUsuarioCiudadano(usuario) {
  const { email, contrasenia, id_referencia } = usuario;
  const [result] = await db.query(
    `INSERT INTO usuario 
        (email, contrasenia_hash, id_referencia, id_tipo_usuario) 
      VALUES (?, ?, ?, ?)`,
    [email, contrasenia, id_referencia, 1]
  );
  return result.insertId;
}

// Buscar por email (para login/validaciones)
export async function buscarUsuarioPorEmail(email) {
  const [rows] = await db.query(`
    SELECT * FROM usuario WHERE email = ?`, 
    [email]
  );
  return rows[0] || null;
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

export const buscarUsuariosPorQuery = async (query) => {
  const esEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(query);
  const esDNI = /^\d{6,}$/.test(query); // asume que los DNIs tienen al menos 6 dígitos

  let sql = `
    SELECT u.id, 
      u.email, 
      u.id_referencia, 
      tu.tipo_usuario, 
      p.nombre, 
      p.apellido, 
      p.dni
    FROM usuario u
    LEFT JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id
    JOIN persona p ON p.id = u.id_referencia
  `;

  let whereClause = '';
  let values = [];

  if (esEmail) {
    whereClause = 'WHERE u.email LIKE ?';
    values = [`%${query}%`];
  } else if (esDNI) {
    whereClause = 'WHERE p.dni LIKE ?';
    values = [`%${query}%`];
  } else {
    whereClause = 'WHERE p.nombre LIKE ? OR p.apellido LIKE ?';
    values = [`%${query}%`, `%${query}%`];
  }

  const [rows] = await db.query(`${sql} ${whereClause}`, values);
  return rows;
};

export async function editarUsuario(id, datos) {
  const { email, estado } = datos;
  await db.query(
    `UPDATE usuario SET email = ?, estado = ? WHERE id = ?`,
    [email, estado, id]
  );
}

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

// pts por usuario
export async function obtenerPuntosUsuario(id) {
   const [rows] = await db.query(
    `SELECT 
      u.puntos_acumulados 
    FROM usuario u 
    WHERE id = ?`,
    [id]
  );
  return rows[0];
}

// sumar pts
export async function sumarPuntosUsuario(conn, id, puntos) {
  const [result] = await conn.query(
    `UPDATE usuario
     SET puntos_acumulados = COALESCE(puntos_acumulados, 0) + ?
     WHERE id = ?`,
    [puntos, id]
  );
  return result.affectedRows;
}

// restar pts
export async function restarPuntosUsuario(conn, id, puntos) {
  const [result] = await conn.query(
    `UPDATE usuario
     SET puntos_acumulados = COALESCE(puntos_acumulados, 0) - ?
     WHERE id = ?`,
    [puntos, id]
  );
  return result.affectedRows;
}

// PERFIL DETALLADO (incluye id_tipo_usuario y texto)
export async function obtenerPerfilDetallado(id) {
  const [rows] = await db.query(
    `SELECT u.id,
      u.email,
      u.id_referencia,
      u.id_tipo_usuario,
      tu.tipo_usuario,
      u.puntos_acumulados,
      u.foto_url,
      u.fecha_creacion,
      u.fecha_modificacion,
      u.estado,
      u.is_super_admin
    FROM usuario u
    LEFT JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id
    WHERE u.id = ?`,
    [id]
  );
  return rows[0];
}

export async function setSuperAdmin(id, isSuper) {
  await db.query(`UPDATE usuario SET is_super_admin = ? WHERE id = ?`, [isSuper ? 1 : 0, Number(id)]);
}

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

// Crear usuario con hash
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

// PERFIL DETALLADO (tipo_usuario + puntos + foto)
export async function obtenerPerfilDetallado(id) {
  const [rows] = await db.query(
    `SELECT u.id, u.email, u.puntos_acumulados, u.foto_url,
            u.fecha_creacion, tu.tipo_usuario
     FROM usuario u
     LEFT JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id
     WHERE u.id = ?`,
    [id]
  );
  return rows[0];
}
export async function sumarPuntosUsuario(id, puntos) {
  await db.query(
    `UPDATE usuario
     SET puntos_acumulados = COALESCE(puntos_acumulados, 0) + ?
     WHERE id = ?`,
    [puntos, id]
  );
}
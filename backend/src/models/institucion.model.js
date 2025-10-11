import db from '../config/db.js';

export async function obtenerTiposInstitucion() {
  const [rows] = await db.query(`SELECT * FROM tipo_institucion`);
  return rows;
}

export async function insertarInstitucion(conn, institucion) {
  const { nombre, id_tipo_institucion, cuit_cuil } = institucion;
  const [result] = await conn.query(
    `INSERT INTO institucion 
        (nombre, id_tipo_institucion, cuit_cuil) 
      VALUES (?, ?, ?)`,
    [nombre, id_tipo_institucion, cuit_cuil]
  );
  return result.insertId;
}

export async function buscarInstitucionPorRefUsuario(id_referencia) {
  const [rows] = await db.query(
    `SELECT i.id,
      i.nombre,
      i.cuit_cuil,
      tu.tipo_usuario
    FROM institucion i 
    INNER JOIN usuario u ON i.id = u.id_referencia AND u.id_tipo_usuario = 5
    INNER JOIN tipo_usuario tu ON u.id_tipo_usuario = tu.id
    WHERE u.id_referencia = ?`,
    [id_referencia]
  );
  return rows[0];
}

export async function buscarInstitucionPorCuitCuil(conn, cuit_cuil) {
  const [rows] = await conn.query(
    `SELECT * FROM institucion WHERE cuit_cuil = ?`,
    [cuit_cuil]
  );
  return rows[0] || null;
}
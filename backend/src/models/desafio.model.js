import db from '../config/db.js';

export async function listarDesafiosDisponibles() {
  const [rows] = await db.query(
    `SELECT id, nombre, puntos_a_ganar, fecha_inicio, fecha_fin
     FROM desafio
     ORDER BY fecha_inicio DESC`
  );
  return rows;
}

export async function listarDesafiosUsuario(idUsuario) {
  const [rows] = await db.query(
    `SELECT ud.id AS id_usuario_desafio, d.nombre, d.puntos_a_ganar,
            ud.completado, ud.puntos_ganados
     FROM usuario_desafio ud
     JOIN desafio d ON d.id = ud.id_desafio
     WHERE ud.id_usuario = ?
     ORDER BY ud.fecha_inscripcion DESC`,
    [idUsuario]
  );
  return rows;
}

export async function inscribirDesafio({ idUsuario, idDesafio }) {
  const [r] = await db.query(
    `INSERT INTO usuario_desafio (id_usuario, id_desafio, completado, puntos_ganados)
     VALUES (?, ?, 0, 0)`,
    [idUsuario, idDesafio]
  );
  return r.insertId;
}

export async function confirmarEntregaDesafio({ idUsuarioDesafio }) {
  // obtenemos relación + puntos del desafío
  const [[row]] = await db.query(
    `SELECT ud.id, ud.id_usuario, d.puntos_a_ganar, ud.completado
     FROM usuario_desafio ud
     JOIN desafio d ON d.id = ud.id_desafio
     WHERE ud.id = ?`,
    [idUsuarioDesafio]
  );
  if (!row) throw new Error('REL_NO_ENCONTRADA');
  if (row.completado) throw new Error('YA_COMPLETADO');

  const conn = await db.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(`UPDATE usuario_desafio SET completado=1, puntos_ganados=? WHERE id=?`, [row.puntos_a_ganar, idUsuarioDesafio]);
    await conn.query(`UPDATE usuario SET puntos_acumulados = COALESCE(puntos_acumulados,0) + ? WHERE id=?`, [row.puntos_a_ganar, row.id_usuario]);
    await conn.commit();
    return { puntos_ganados: row.puntos_a_ganar };
  } catch (e) {
    await conn.rollback();
    throw e;
  } finally {
    conn.release();
  }
}

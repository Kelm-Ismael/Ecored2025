// src/models/ecopunto.model.js
import db from '../config/db.js';

export async function obtenerEcopuntoPorId(id) {
  if (!id) return null;
  const [rows] = await db.query(
    'SELECT id, nombre FROM ecopunto WHERE id = ? LIMIT 1',
    [id]
  );
  return rows[0] || null;
}

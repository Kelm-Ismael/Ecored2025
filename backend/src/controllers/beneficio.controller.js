import db from '../config/db.js';

export async function getBeneficios(req, res) {
  try {
    const [rows] = await db.query(
      `SELECT id, id_tipo_beneficio, descripcion, puntos_requeridos, estado
       FROM beneficio
       WHERE estado IS NULL OR estado='activo'
       ORDER BY puntos_requeridos ASC, id DESC`
    );
    res.json(rows);
  } catch (err) {
    console.error('Error al obtener beneficios:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function getBeneficioById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await db.query(`SELECT * FROM beneficio WHERE id = ?`, [id]);
    if (!rows.length) return res.status(404).json({ error: 'Beneficio no encontrado' });
    res.json(rows[0]);
  } catch (err) {
    console.error('Error al obtener beneficio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function crearBeneficio(req, res) {
  try {
    const { id_tipo_beneficio, descripcion, puntos_requeridos } = req.body;
    if (!id_tipo_beneficio || !descripcion || !puntos_requeridos) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    const [r] = await db.query(
      `INSERT INTO beneficio (id_tipo_beneficio, descripcion, puntos_requeridos, estado)
       VALUES (?, ?, ?, 'activo')`,
      [id_tipo_beneficio, descripcion, puntos_requeridos]
    );
    res.status(201).json({ id: r.insertId, id_tipo_beneficio, descripcion, puntos_requeridos, estado: 'activo' });
  } catch (err) {
    console.error('Error al crear beneficio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function actualizarBeneficio(req, res) {
  try {
    const { id } = req.params;
    const { descripcion, puntos_requeridos, estado } = req.body;
    await db.query(
      `UPDATE beneficio
       SET descripcion = COALESCE(?, descripcion),
           puntos_requeridos = COALESCE(?, puntos_requeridos),
           estado = COALESCE(?, estado)
       WHERE id = ?`,
      [descripcion, puntos_requeridos, estado, id]
    );
    res.json({ mensaje: 'Beneficio actualizado' });
  } catch (err) {
    console.error('Error al actualizar beneficio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export async function eliminarBeneficio(req, res) {
  try {
    const { id } = req.params;
    await db.query(`DELETE FROM beneficio WHERE id = ?`, [id]);
    res.json({ mensaje: 'Beneficio eliminado' });
  } catch (err) {
    console.error('Error al eliminar beneficio:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

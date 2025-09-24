import db from '../config/db.js';

export async function obtenerBeneficios() {
    const [rows] = await db.query(`
       SELECT 
            b.id,
            b.id_tipo_beneficio,
            tb.descripcion as 'tipo',
            b.descripcion,
            b.puntos_requeridos,
            b.fecha_creacion,
            b.fecha_modificacion,
            CONCAT(p.nombre, ' ', p.apellido) AS usuario_creador,
            b.estado
        FROM beneficio b
        LEFT JOIN tipo_beneficio tb ON b.id_tipo_beneficio = tb.id
        LEFT JOIN usuario u ON b.id_usuario_creador = u.id
        LEFT JOIN persona p ON u.id_referencia = p.id 
    `);
    return rows;
}
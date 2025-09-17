import db from '../config/db.js';

export async function obtenerBeneficios() {
    const [rows] = await db.query(`
        SELECT 
            b.id, 
            tb.descripcion, 
            b.descripcion, 
            b.fecha_creacion, 
            b.fecha_modificacion, 
            b.estado, 
            b.id_usuario_creador 
        FROM beneficio b 
        LEFT JOIN tipo_beneficio tb ON b.id_tipo_beneficio =  tb.id
    `);
    return rows;
}
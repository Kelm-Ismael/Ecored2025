import db from '../config/db.js';

export async function obtenerLocaciones() {
    const [rows] = await db.query(`
        SELECT 
            *
        FROM ecopunto
    `);
    return rows;
}
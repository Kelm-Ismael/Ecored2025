import db from './config/db.js';

async function test() {
  try {
    const [rows] = await db.query('SELECT * FROM usuario');
    console.log('Usuarios:', rows);
  } catch (err) {
    console.error('Error de conexión o consulta:', err);
  } finally {
    db.end();
  }
}

test();
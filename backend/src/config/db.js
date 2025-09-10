
import mysql from 'mysql2/promise';
import 'dotenv/config';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
// Test inmediato al iniciar
(async () => {
  try {
    const [rows] = await pool.query('SELECT 1+1 AS resultado');
    console.log(' Conexión MySQL OK:', rows[0].resultado);
  } catch (err) {
    console.error(' Error al conectar con MySQL:', err.message);
  }
})();


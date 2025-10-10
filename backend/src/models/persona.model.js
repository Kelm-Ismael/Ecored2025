import db from '../config/db.js';

export async function obtenerPersonas() {
  const [rows] = await db.query(`SELECT * FROM persona`); //consulta sql va entre las comillas
  return rows;
}

// usado en crearusuario desde app
export async function insertarPersona(conn, persona) {
  const { nombre, apellido, dni, fechaNacimiento, id_tipo_persona } = persona;
  const [result] = await conn.query(
    `INSERT INTO persona 
        (nombre, apellido, dni, fecha_nacimiento, id_tipo_persona) 
      VALUES (?, ?, ?, ?, ?)`,
    [nombre, apellido, dni, fechaNacimiento, id_tipo_persona]
  );
  return result.insertId;
}

export async function insertarPersonaCompleto(conn, persona) {
  const { nombre, apellido, dni, fechaNacimiento, cuit_cuil, sexo, id_tipo_persona } = persona;
  const [result] = await conn.query(
    `INSERT INTO persona 
        (nombre, apellido, dni, fecha_nacimiento, cuit_cuil, sexo, id_tipo_persona) 
      VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [nombre, apellido, dni, fechaNacimiento, cuit_cuil, sexo, id_tipo_persona]
  );
  return result.insertId;
}

export async function buscarPersonaPorId(id) {
  const [rows] = await db.query(
    `SELECT id, 
      nombre, 
      apellido, 
      dni, 
      fecha_nacimiento, 
      cuit_cuil, 
      sexo, 
      id_tipo_persona
     FROM persona
     WHERE id = ?`,
    [id]
  );
  return rows[0];
}

// usado en crearusuario en app
export async function buscarPersonaPorDni(conn, dni) {
  const [rows] = await conn.query(
    `SELECT * FROM persona WHERE dni = ?`,
    [dni]
  );
  return rows[0] || null;
}

export async function buscarPersonaPorRefUsuario(id) {
  const [rows] = await db.query(
    `SELECT p.id,
      p.nombre,
      p.apellido,
      p.dni,
      p.fecha_nacimiento,
      p.cuit_cuil,
      p.sexo,
      p.id_tipo_persona,
      tu.tipo_usuario
    FROM usuario u 
    JOIN
      persona p ON u.id_referencia = p.id
    LEFT JOIN 
      tipo_usuario tu ON u.id_tipo_usuario = tu.id
    WHERE u.id_referencia = ?`,
    [id]
  );
  return rows[0];
}
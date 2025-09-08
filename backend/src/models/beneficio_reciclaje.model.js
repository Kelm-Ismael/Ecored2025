import db from '../config/db.js';

// Devuelve true si ya existe un registro con ese qr_token
export async function existeQrToken(code) {
  // Guardamos como binario para que coincida con tu BLOB (utf8 -> Buffer)
  const tokenBuf = Buffer.from(String(code), 'utf8');
  const [rows] = await db.query(
    'SELECT id_beneficio_reciclaje FROM beneficio_reciclaje WHERE qr_token = ? LIMIT 1',
    [tokenBuf]
  );
  return !!rows[0];
}

export async function insertarBeneficioReciclaje({
  id_usuario,
  id_ecopunto = null,
  tipo_material = '',
  peso = null,
  puntos_obtenidos,
  fecha = null,         // si viene, usamos esa fecha (DATE), si no NOW()
  qr_token,             // string
}) {
  const tokenBuf = Buffer.from(String(qr_token), 'utf8');

  if (fecha) {
    await db.query(
      `INSERT INTO beneficio_reciclaje
        (id_registro, id_usuario, id_ecopunto, tipo_material, peso, puntos_obtenidos, fecha, qr_token)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        0, // no usás id_registro FK aquí, dejamos 0 o NULL según tu modelo (ajusta si corresponde)
        id_usuario,
        id_ecopunto,
        tipo_material,
        peso,
        puntos_obtenidos,
        fecha,      // 'YYYY-MM-DD'
        tokenBuf
      ]
    );
  } else {
    await db.query(
      `INSERT INTO beneficio_reciclaje
        (id_registro, id_usuario, id_ecopunto, tipo_material, peso, puntos_obtenidos, fecha, qr_token)
       VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?)`,
      [
        0,
        id_usuario,
        id_ecopunto,
        tipo_material,
        peso,
        puntos_obtenidos,
        tokenBuf
      ]
    );
  }
}

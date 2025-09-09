// src/models/settings.model.js
import db from '../config/db.js';

export async function getAppSettings() {
  const [rows] = await db.query(
    `SELECT allow_admin_self_signup FROM app_settings ORDER BY id DESC LIMIT 1`
  );
  return rows?.[0] || { allow_admin_self_signup: 0 };
}

export async function updateAppSettings({ allow_admin_self_signup }) {
  const val = allow_admin_self_signup ? 1 : 0;
  await db.query(
    `INSERT INTO app_settings (allow_admin_self_signup) VALUES (?)
     ON DUPLICATE KEY UPDATE allow_admin_self_signup = VALUES(allow_admin_self_signup)`,
    [val]
  );
  return { allow_admin_self_signup: val };
}

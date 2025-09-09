// src/middleware/roles.js
export function requireAdmin(req, res, next) {
  const u = req.user;
  if (!u) return res.status(401).json({ error: 'No autenticado' });
  const isAdmin = Number(u.id_tipo_usuario) === 5 || Boolean(u.is_super_admin);
  if (!isAdmin) return res.status(403).json({ error: 'Requiere administrador' });
  next();
}

export function requireSuperAdmin(req, res, next) {
  const u = req.user;
  if (!u) return res.status(401).json({ error: 'No autenticado' });
  if (!Boolean(u.is_super_admin)) {
    return res.status(403).json({ error: 'Requiere super admin' });
  }
  next();
}

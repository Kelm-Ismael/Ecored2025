// import jwt from 'jsonwebtoken';
// import dotenv from 'dotenv';

// dotenv.config();

// export function verificarToken(req, res, next) {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (!token) return res.status(401).json({ error: 'Token requerido' });

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(403).json({ error: 'Token inválido' });

//     req.usuario = decoded;
//     next();
//   });
// }

import jwt from 'jsonwebtoken';

export function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token inválido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // agrega { id } al request
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

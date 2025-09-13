const LOCAL = 'http://localhost:3000'; // cuando estás en desarrollo
const LAN = 'http://192.168.100.7:3000'; // IP de tu PC en la red WiFi
const REMOTO = 'https://midominio.com'; // si tenés un deploy

export const BASE_URL = LAN;
console.log(BASE_URL)
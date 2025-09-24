import dotenv from 'dotenv';
dotenv.config();

export const FRONT_URL = `${process.env.API_HOST}:${process.env.FRONT_PORT}`;

console.log("URL completa:", FRONT_URL);

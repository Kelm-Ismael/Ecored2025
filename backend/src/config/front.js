<<<<<<< HEAD
import { Console } from 'console';
import dotenv from 'dontenv'
=======
import dotenv from 'dotenv';
>>>>>>> origin/Caro
dotenv.config();

export const FRONT_URL = `${process.env.API_HOST}:${process.env.FRONT_PORT}`;

<<<<<<< HEAD
Console.log("URL COMPLETA: ", FRONT_URL);
=======
console.log("URL completa:", FRONT_URL);
>>>>>>> origin/Caro

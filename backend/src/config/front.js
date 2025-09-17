import { Console } from 'console';
import dotenv from 'dontenv'
dotenv.config();

export const FRONT_URL = `${process.env.API_HOST}:${process.env.FRONT_PORT}`;

Console.log("URL COMPLETA: ", FRONT_URL);
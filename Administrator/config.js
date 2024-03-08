// package for the env variables
import dotenv from 'dotenv';
// automatically loads the .env file and configured
dotenv.config();
// export the env variables
export const PORT = process.env.PORT;
export const DOMAIN_ADMIN = process.env.DOMAIN_ADMIN;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;
export const PROTOCOL = process.env.PROTOCOL
export const SESSION_SECRET = process.env.SESSION_SECRET;
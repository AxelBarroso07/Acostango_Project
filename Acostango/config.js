import dotenv from 'dotenv';

dotenv.config();

export const corsOptions = {
    origin: `http://${process.env.VITE_DB_HOST}:${process.env.VITE_PORT}`,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
};

export const PORT = process.env.PORT;
export const DB_HOST = process.env.DB_HOST;
export const DB_PORT = process.env.DB_PORT;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_DATABASE = process.env.DB_DATABASE;

export const GMAIL_APPS_USER = process.env.GMAIL_APPS_USER;
export const GMAIL_APPS_PASSWD = process.env.GMAIL_APPS_PASSWD;
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';

dotenv.config();

export const PORT = process.env.PORT || 3000;
export const DB_HOST = process.env.DB_HOST || 'localhost';
export const DB_PORT = process.env.DB_PORT || 3306;
export const DB_USER = process.env.DB_USER || 'root';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_DATABASE = process.env.DB_DATABASE || 'acostango';

// export const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './src/public/images');
//     },
//     filename: function (req, file, cb) {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
//     }
// });

// export const storage = multer.memoryStorage()

// export const upload = multer({ dest : './uploads/' });

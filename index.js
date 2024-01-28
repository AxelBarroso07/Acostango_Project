import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import multer from 'multer'

import { PORT } from './config.js';

import indexRoutes from './src/server/routes/index.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// Configuración de multer
const storage = multer.memoryStorage()
const upload = multer({ storage: storage });
//Settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views'))

//Middlewares
app.use(express.static('./src/public'))
app.use(express.static('./src/views'))
// app.use(upload.single('image'));

process.setMaxListeners(15);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//Routes
app.use(indexRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});

export { upload }
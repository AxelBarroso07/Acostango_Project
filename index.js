import express from 'express';
import { PORT } from './config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import indexRoutes from './src/server/routes/index.routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views'))

//Middlewares
app.use(express.static('./src/public'))

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
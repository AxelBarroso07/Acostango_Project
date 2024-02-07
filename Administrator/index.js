import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';

import { PORT } from './config.js';

import indexRoutes from './src/server/routes/index.routes.js';
import configRoutes from './src/server/routes/config.routes.js';
import classRoutes from './src/server/routes/class.routes.js';
import eventRoutes from './src/server/routes/event.routes.js';

const app = express();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//Settings
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, '/src/views'))

//Middlewares
app.use('/public', express.static(path.join(__dirname, 'src/public')))
app.use(express.static('./src/views'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Routes
app.use(indexRoutes);
app.use(configRoutes);
app.use(classRoutes);
app.use(eventRoutes);

app.use((req, res, next) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
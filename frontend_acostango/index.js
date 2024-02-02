import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { PORT, corsOptions } from './config.js';

import calendarRoutes from './src/server/routes/calendar.routes.js';
import eventsRoutes from './src/server/routes/events.routes.js';

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// app.use('/public', express.static(path.join(__dirname, 'src/public')))

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(calendarRoutes);
app.use(eventsRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
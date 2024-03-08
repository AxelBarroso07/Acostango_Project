import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import cors from 'cors';

import { PORT, corsOptions } from './config.js';

import calendarRoutes from './src/server/routes/calendar.routes.js';
import classesRoutes from './src/server/routes/classes.routes.js';
import eventsRoutes from './src/server/routes/events.routes.js';
import sendMail from './src/server/routes/sendMail.routes.js';

const app = express()

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(calendarRoutes);
app.use(classesRoutes);
app.use(eventsRoutes);
app.use(sendMail);

app.use((req, res, next) => {
    res.status(404).json({
        message: "Endpoint not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server listen on port ${PORT}`);
});
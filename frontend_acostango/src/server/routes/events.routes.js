import { Router, json } from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import { getEvents } from '../controller/events.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router();

router.get('/events', getEvents);

export default router
import Router from 'express';

import { getEvents } from '../controller/events.controller.js';

const router = Router();

router.get('/events', getEvents);

export default router
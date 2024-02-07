import { Router, json } from 'express';

import { postSendEmail } from '../controller/sendMail.controller.js';

const router = Router();

router.post('/sendMail', postSendEmail);

export default router
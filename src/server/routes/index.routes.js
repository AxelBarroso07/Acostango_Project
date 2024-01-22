import { Router, json } from 'express';
import { getIndex, postIndex, updIndex, delIndex, getCalendar, postEditClass, deleteClass, postNewClass } from '../controllers/index.controller.js';

const router = Router();

router.use(json());

router.get('/get', getIndex);

router.post('/post', postIndex);

router.put('/put', updIndex);

router.delete('/delete', delIndex);

router.get('/calendar', getCalendar);

router.post('/editClass/:idCalendar', postEditClass);

router.delete('/deleteClass/:idCalendar', deleteClass);

router.post('/newClass',  postNewClass);

export default router;
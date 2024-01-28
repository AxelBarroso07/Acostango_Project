import { Router, json } from 'express';
// import { upload } from '../../../config.js';
import { getIndex, postIndex, updIndex, delIndex, getConfig, getCalendar, postEditClass, deleteClass, postNewClass } from '../controllers/index.controller.js';

const router = Router();

// router.use(upload.single('image'), json());

router.get('/get', getIndex);

router.post('/post', postIndex);

router.put('/put', updIndex);

router.delete('/delete', delIndex);

router.get('/config', getConfig);

router.get('/calendar', getCalendar);

router.post('/editClass/:idCalendar', postEditClass);

router.delete('/deleteClass/:idCalendar', deleteClass);

router.post('/newClass', postNewClass);

export default router;
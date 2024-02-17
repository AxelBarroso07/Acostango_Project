import { Router } from 'express';
import { getCreateClass, postConfirmCreateClass, getEditClass, putConfirmEditClass, deleteClass } from '../controllers/class.controller.js';

const router = Router();

//Create Class
router.get('/createClass', getCreateClass);
router.post('/confirmCreateClass', postConfirmCreateClass);

//Edit class
router.get('/editClass/:idCalendar', getEditClass);
router.put('/confirmEditClass/:idCalendar', putConfirmEditClass);

//Delete class
router.delete('/deleteClass/:idCalendar', deleteClass);

export default router;
// index.routes.js
import { Router, json } from 'express';
import multer from 'multer';
import sharp from 'sharp';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { getIndex, getConfig, getCalendar, postEditClass, deleteClass, postNewClass, getCreateClass, postConfirmCreateClass, getCreateEvent, postConfirmCreateEvent } from '../controllers/index.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        const uploadDir = path.resolve(__dirname, '..', '..', 'public', 'uploads');
        // console.log("uploadDir:", uploadDir)
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => {
        const fileName = path.parse(file.originalname).name
        const currentDate = new Date()
        const formattedDate = currentDate.toISOString().slice(0, 10)
        const formattedTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, '')
        const fileExtension = path.extname(file.originalname)

        const finalNameFile = `${fileName}_${formattedDate}_${formattedTime}${fileExtension}`
        callback(null, finalNameFile)
        // console.log("finalNameFile:", finalNameFile)
    }
});

export const upload = multer({
    storage: storage,
    limits: {
        files: 1
    },
    fileFilter: (req, file, cb) => {
        const types = /jpeg|jpg|png/;
        const mime = types.test(file.mimetype);
        const ext = types.test(path.extname(file.originalname));

        if (mime && ext){
            return cb(null, true);
        }
        cb("Error: invalid image type")
    },
    debug: true
}).single('image')

const router = Router();

// router.use(upload.single('image'), json());

router.get('/calendar', getCalendar);

router.post('/editClass/:idCalendar', postEditClass);

router.delete('/deleteClass/:idCalendar', deleteClass);

router.post('/newClass', postNewClass);

//new endpoints
router.get('/', getIndex);

router.get('/config', getConfig);

router.get('/createClass', getCreateClass);

router.post('/confirmCreateClass', postConfirmCreateClass);

router.get('/createEvent', getCreateEvent);

router.post('/confirmCreateEvent', upload, postConfirmCreateEvent);

// router.post('/uploadImage', uploadHandler, uploadImage);

export default router;
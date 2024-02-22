import { Router } from 'express';
import multer from 'multer'; // import multer for file upload
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import the functions from the controller
import { getCreateEvent, postConfirmCreateEvent, getEditEvent, putConfirmEditEvent, deleteEvent } from '../controllers/event.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set storage engine
const storage = multer.diskStorage({
    destination: (req, file, callback) => {  // set the storage directory
        const uploadDir = path.resolve(__dirname, '..', '..', 'public', 'uploads');
        console.log("uploadDir:", uploadDir)
        callback(null, uploadDir);
    },
    filename: (req, file, callback) => { // set how the file will be named
        const fileName = path.parse(file.originalname).name.replace(/\s/g, '_')
        const currentDate = new Date()
        const formattedDate = currentDate.toISOString().slice(0, 10)
        const formattedTime = currentDate.toTimeString().slice(0, 8).replace(/:/g, '')
        const fileExtension = path.extname(file.originalname)

        const finalNameFile = `${fileName}_${formattedDate}_${formattedTime}${fileExtension}` // the file will be named as: filename_date_time.extension
        callback(null, finalNameFile)
        // console.log("finalNameFile:", finalNameFile)
    }
});

// upload image function
export const upload = multer({
    storage: storage, // set the storage engine with the configuration previously set
    limits: {
        files: 1 // set limit of files in 1
    },
    fileFilter: (req, file, cb) => { // if the file is not an image(jpeg|jpg|png), it will not be uploaded
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

// Create Event routes
router.get('/createEvent', getCreateEvent);
router.post('/confirmCreateEvent', upload, postConfirmCreateEvent);

// Edit Event routes
router.get('/editEvent/:idCalendar', getEditEvent);
router.put('/confirmEditEvent/:idCalendar', upload, putConfirmEditEvent);

// Delete Event routes
router.delete('/deleteEvent/:idCalendar', deleteEvent)

export default router;
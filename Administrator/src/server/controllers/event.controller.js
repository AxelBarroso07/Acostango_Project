import { pool } from "../../../db.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from 'fs';
import { promisify } from 'util';
import sharp from "sharp";

//Create event
export const getCreateEvent = async(req, res) => {
    try {
        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
        
        return res.render("createEvent", {
            weekDay
        })
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const postConfirmCreateEvent = async(req, res) => {
    try {
        
        const reqBody = req.body
        const category = 'event'

        if (!req.file) {
            console.error(error);
            res.render('error', { titlePage: 'An error has occurred' });
        }

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Compress image
        const imagePath = req.file.path; //Image original name
        const compressedPath = 'src/public/images/'//Directory Path for compressed images
        const compressedImagePath = compressedPath + req.file.filename;//Path for compressed images
        const fileExtension = req.file.filename.split('.').pop().toLowerCase();//File extension
        let fileCompress = sharp(imagePath);//Image to compress
        if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
            fileCompress = fileCompress.jpeg({ quality: 50 })
        } else if (fileExtension === 'png') {
            fileCompress = fileCompress.png({ quality: 50 })
        } 
        await fileCompress.toFile(compressedImagePath);

        const fileCompressedImage = req.file.filename
        const dirPhotoCompressed = `${fileCompressedImage}`
        // console.log("dirPhotoCompressed:", dirPhotoCompressed)
        
        //Compress image 2
        const imagePath2 = req.file.path.replace(/\s/g, '_'); //Image original name
        // console.log("imagePath2:", imagePath2)
        const compressedPath2 = __dirname + '/../../../../Acostango/src/assets/imageEvents/'//Directory Path for compressed images
        const compressedImagePath2 = compressedPath2 + req.file.filename;//Path for compressed images
        const fileExtension2 = req.file.filename.split('.').pop().toLowerCase();//File extension
        let fileCompress2 = sharp(imagePath2);//Image to compress
        if (fileExtension2 === 'jpg' || fileExtension2 === 'jpeg') {
            fileCompress2 = fileCompress2.jpeg({ quality: 20 })
        } else if (fileExtension2 === 'png') {
            fileCompress2 = fileCompress2.png({ quality: 20 })
        } 
        await fileCompress2.toFile(compressedImagePath2);

        const data = {
            title: reqBody.title,
            description: reqBody.description,
            image: dirPhotoCompressed,
            day: reqBody.day,
            date: new Date(reqBody.date),
            location: reqBody.location,
            price: reqBody.price,
            time_start: reqBody.time_start,
            time_finish: null,
            category: category,
            workshop: null
        }

        const [ rows ] = await pool.query("INSERT INTO calendar(title, description, image, day, date, location, price, time_start, time_finish, category, workshop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.title, data.description, data.image, data.day, data.date, data.location, data.price, data.time_start, data.time_finish, data.category, data.workshop])

        return res.redirect('/')
        
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

//Edit event
export const getEditEvent = async (req,res) =>{
    try {
        const id = parseInt(req.params.idCalendar);
        const [ rows ] = await pool.query("SELECT * FROM calendar  WHERE id_calendar = ?", [id])

        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];
    
        // Format date to YYYY-MM-DD
        const formatDate = new Date(rows[0].date).toISOString().split('T')[0];

        return res.status(200).render("editEvent", {
            data: rows[0],
            date_formatted: formatDate,
            weekDay
        });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const putConfirmEditEvent = async (req,res) =>{
    try {
        const idCalendar = parseInt(req.params.idCalendar);
        const reqBody = req.body;

        if (!req.file) {
            console.error(error);
            res.render('error', { titlePage: 'An error has occurred' });
        }

        // Compress image
        const imagePath = req.file.path; //Image original name

        const compressedPath = 'src/public/images/'//Directory Path for compressed images

        const compressedImagePath = compressedPath + req.file.filename;//Path for compressed images

        const fileExtension = req.file.filename.split('.').pop().toLowerCase();//File extension

        let fileCompress = sharp(imagePath);//Image to compress

        if (fileExtension === 'jpg' || fileExtension === 'jpeg') {
            fileCompress = fileCompress.jpeg({ quality: 20 })
        } else if (fileExtension === 'png') {
            fileCompress = fileCompress.png({ quality: 20 })

        } 
        await fileCompress.toFile(compressedImagePath);
        
        const dirFolder = '../public/images/'
        const fileCompressedImage = req.file.filename
        const dirPhotoCompressed = `${dirFolder}${fileCompressedImage}`

        const data = {
            title: reqBody.title,
            description: reqBody.description,
            image: dirPhotoCompressed,
            day: reqBody.day,
            date: new Date(reqBody.date),
            location: reqBody.location,
            price: reqBody.price,
            timeStart: reqBody.timeStart,
            timeFinish: null,
            workshop: null
        }

        const [ result ] = await pool.query("UPDATE calendar SET title = ?, description = ?, image = ?, day = ?, date = ?, location = ?, price = ?, time_start = ?, time_finish = ?, workshop = ? WHERE id_calendar = ?", [data.title, data.description, data.image, data.day, data.date, data.location, data.price, data.timeStart, data.timeFinish, data.workshop, idCalendar]);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                isUpdateRegister: false
            })
        } else {
            console.log("Row updated")
            return res.status(200).json({
                isUpdateRegister: true
            })
        }

    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

//Delete event
export const deleteEvent = async (req, res) => {
    try {
        const idCalendar = parseInt(req.params.idCalendar);

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        const unlinkAsync = promisify(fs.unlink);

        const [imageData] = await pool.query("SELECT image FROM calendar WHERE id_calendar = ?", [idCalendar]);

        const imageFileCompressPathAdminPage = path.join(__dirname, '../../../src/public/images', imageData[0].image)
        // console.log(imageFileCompressPathAdminPage)
        //
        const imageFileCompressPathPrincipalPage = path.join(__dirname, '../../../../Acostango/src/assets/imageEvents', imageData[0].image)
        // console.log(imageFileCompressPathPrincipalPage)

        const [ rows ] = await pool.query("DELETE FROM calendar WHERE id_calendar = ?", [idCalendar])

        if(rows.affectedRows > 0) {
            try {
                await fs.promises.access(imageFileCompressPathAdminPage);
                await unlinkAsync(imageFileCompressPathAdminPage);
                //
                await fs.promises.access(imageFileCompressPathPrincipalPage);
                await unlinkAsync(imageFileCompressPathPrincipalPage);
            } catch(error) {
                console.log("errorrrr")
                console.error(error)
            }

            return res.status(204).json({
                'message': 'Event deleted successfuly'
            })
        }
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}


import { pool } from "../../../db.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import moment from 'moment'
import { PORT, DB_HOST } from '../../../config.js';
import { upload } from "../routes/index.routes.js";
import multer from "multer";
import sharp from "sharp";

export const getIndex = async (req, res) => {
    try {
        let rowsParse = []
        const dayFreeCheck = ''
        const dayFreeIs = true
        const classesPerDay = {};
        
        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const currentDate = new Date();
        const currentDay = weekDay[currentDate.getDay()];

        const [ rows ] = await pool.query(`SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date_formatted FROM calendar ORDER BY CASE
            WHEN day = 'Sunday' THEN 1
            WHEN day = 'Monday' THEN 2
            WHEN day = 'Tuesday' THEN 3
            WHEN day = 'Wednesday' THEN 4
            WHEN day = 'Thursday' THEN 5
            WHEN day = 'Friday' THEN 6
            WHEN day = 'Saturday' THEN 7
            END`
        );
        
        const fullDays = {};

        if (rows && rows.length > 0) {
            rowsParse = rows.map(row => {
                const dayKey = row.day.toLowerCase();
        
                if (!classesPerDay[dayKey]) {
                    classesPerDay[dayKey] = 1;
                } else if (classesPerDay[dayKey] < 3) {
                    classesPerDay[dayKey] += 1;
                } else {
                    if (!fullDays[dayKey]) {
                        fullDays[dayKey] = {
                            day: row.day,
                            classes: [row],
                        };
                    } else {
                        fullDays[dayKey].classes.push(row);
                    }
                }

                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    image: row.image,
                    day: row.day,
                    date: row.date_formatted,
                    location: row.location,
                    price: row.price,
                    block: row.block,
                    timeStartParse: row.time_start,
                    timeFinishParse: row.time_finish,
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
                    time12hrsFinishFormat: row.time_finish !== null ? moment(row.time_finish, 'hh:mm:ss A').format('hh:mm A') : null,
                    workshop: row.workshop,
                    category: row.category
                };
            })
        }

        return res.render("index", {
            weekDay,
            rowsParse,
            dayFreeCheck,
            dayFreeIs
        });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
};

export const getConfig = async (req, res) => {
    try {
        const config = {
            PORT,
            DB_HOST
        }
        res.json(config)
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const getEditClass = async (req,res) =>{
    try {
        const id = parseInt(req.params.idCalendar);

        const classesPerDay = {};
        const fullDays = {};

        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const [ rows ] = await pool.query("SELECT * FROM calendar WHERE id_calendar = ?", [id])

        const [ rowsFullDay ] = await pool.query(`SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date_formatted FROM calendar ORDER BY CASE
            WHEN day = 'Sunday' THEN 1
            WHEN day = 'Monday' THEN 2
            WHEN day = 'Tuesday' THEN 3
            WHEN day = 'Wednesday' THEN 4
            WHEN day = 'Thursday' THEN 5
            WHEN day = 'Friday' THEN 6
            WHEN day = 'Saturday' THEN 7
            END`
        );

        if (rows && rows.length > 0) {
            rowsFullDay.map(row => {
                const dayKey = row.day.toLowerCase();
        
                if (!classesPerDay[dayKey]) {
                    classesPerDay[dayKey] = 1;
                } else if (classesPerDay[dayKey] < 3) {
                    classesPerDay[dayKey] += 1;
                } else {
                    if (!fullDays[dayKey]) {
                        fullDays[dayKey] = {
                            day: row.day,
                            classes: [row],
                        };
                    } else {
                        fullDays[dayKey].classes.push(row);
                    }
                }
            });
        }

        return res.status(200).render("editClass", {
            data: rows[0],
            weekDay,
            fullDays
        });
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const putConfirmEditClass = async (req, res) =>{
    try {
        const idCalendar = parseInt(req.params.idCalendar);
        const reqBody = req.body.data;

        const data = {
            title: reqBody.title,
            description: reqBody.description,
            day: reqBody.day,
            price: reqBody.price,
            block: reqBody.block,
            timeStart: reqBody.timeStart,
            timeFinish: reqBody.timeFinish,
            workshop: reqBody.workshop === 'true' ? true : false
        }

        const [ result ] = await pool.query("UPDATE calendar SET title = ?, description = ?, day = ?, price = ?, block = ?, time_start = ?, time_finish = ?, workshop = ? WHERE id_calendar = ?", [data.title, data.description, data.day, data.price, data.block, data.timeStart, data.timeFinish, data.workshop, idCalendar]);

        if(result.affectedRows === 0) {
            return res.status(404).json({
                isUpdateRegister: false
            })
        } else {
            return res.status(200).json({
                isUpdateRegister: true
            })
        }
    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

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

export const deleteClass = async (req, res) => {
    try {
        const idCalendar = parseInt(req.params.idCalendar);

        const [ rows ] = await pool.query("DELETE FROM calendar WHERE id_calendar = ?", [idCalendar])

        if(rows.affectedRows > 0) {
            return res.status(204).json({
                'message': 'class deleted successfuly'
            })
        }
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const getCreateClass = async (req, res) => {
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

        const [rows] = await pool.query(`SELECT * FROM calendar`);
        const classesPerDay = {};
        const fullDays = {};

        if (rows && rows.length > 0) {
            rows.forEach(row => {
                const dayKey = row.day.toLowerCase();

                if (!classesPerDay[dayKey]) {
                    classesPerDay[dayKey] = 1;
                } else if (classesPerDay[dayKey] < 3) {
                    classesPerDay[dayKey] += 1;
                } else {
                    if (!fullDays[dayKey]) {
                        fullDays[dayKey] = {
                            day: row.day,
                            classes: [row],
                        };
                    } else {
                        fullDays[dayKey].classes.push(row);
                    }
                }
            });
        }

        res.render("createClass", {
            weekDay,
            fullDays
        })
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

export const postConfirmCreateClass = async (req, res) => {
    try {
        const reqBody = req.body

        const data = {
            title: reqBody.title,
            description: reqBody.description,
            day: reqBody.day,
            price: reqBody.price,
            block: reqBody.block,
            time_start: reqBody.time_start,
            time_finish: reqBody.time_finish,
            category: 'class',
            workshop: reqBody.workshop === 'true' ? true : false
        };

        const [ rows ] = await pool.query("INSERT INTO calendar SET title = ?, description = ?, image = null, day = ?, price = ?, block = ?,  date = ?, location = null,  time_start = ?, time_finish = ?, category = ?, workshop = ?", [data.title, data.description, data.day, data.price, data.block, data.date, data.time_start, data.time_finish, data.category, data.workshop])

        return res.redirect("/")
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

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

export const getHandleError = async (req,res) =>{
    try {
        throw new Error('Testing error');

    } catch (error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}
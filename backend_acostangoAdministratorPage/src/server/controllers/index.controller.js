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

        const [ rows ] = await pool.query(`SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date_formatted,
        FORMAT(price, 2) AS price_formatted FROM calendar ORDER BY CASE
            WHEN day = 'Sunday' THEN 1
            WHEN day = 'Monday' THEN 2
            WHEN day = 'Tuesday' THEN 3
            WHEN day = 'Wednesday' THEN 4
            WHEN day = 'Thursday' THEN 5
            WHEN day = 'Friday' THEN 6
            WHEN day = 'Saturday' THEN 7
            END`
        );
        console.log("rows from /:", rows)

        // const priceFormat = rows.price_formatted.toString()
        const fullDays = {};

        if (rows && rows.length > 0) {
            rowsParse = rows.map(row => {
                const dayKey = row.day.toLowerCase();
        
                if (!classesPerDay[dayKey]) {
                    classesPerDay[dayKey] = 1;
                } else if (classesPerDay[dayKey] < 3) {
                    classesPerDay[dayKey] += 1;
                } else {
                    // Almacena información adicional para días llenos
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
                    price: row.price_formatted,
                    timeStartParse: row.time_start,
                    timeFinishParse: row.time_finish,
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
                    time12hrsFinishFormat: row.time_finish !== null ? moment(row.time_finish, 'hh:mm:ss A').format('hh:mm A') : null,
                    workshop: row.workshop
                };
            })
        }

        console.log("rowsParse to index:", rowsParse)
        console.log("fullDays to index:", fullDays)
        // console.log("fullDays to index:", JSON.stringify(fullDays, null, 2))

        return res.render("index", {
            weekDay,
            rowsParse,
            dayFreeCheck,
            dayFreeIs
        });
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error",
        });
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
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getCalendar = async (req, res) => {
    try {
        // console.log(PORT, DB_HOST)
        const date = new Date();

        const year = date.getFullYear();
        const month = date.getMonth();

        const nameMonth = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December",
        ];

        const weekDay = [
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
        ];

        const positonMonth = nameMonth[date.getMonth()];

        const [ rows ] = await pool.query(`SELECT *, DATE_FORMAT(date, '%d/%m/%Y') AS date_formatted,
        FORMAT(price, 2) AS price_formatted FROM calendar ORDER BY CASE
            WHEN day = 'Sunday' THEN 1
            WHEN day = 'Monday' THEN 2
            WHEN day = 'Tuesday' THEN 3
            WHEN day = 'Wednesday' THEN 4
            WHEN day = 'Thursday' THEN 5
            WHEN day = 'Friday' THEN 6
            WHEN day = 'Saturday' THEN 7
            END`);
        // console.log("rows getCalendar:", rows)
        // 
        
        let hourClassesArray = []
        let hourClassesArrayFormat = []
        let rowsParse = []
        let uniqueSortedArray = []

        //Format hour classes
        if(rows && rows.length > 0) {
        
            let hourClassesSet = new Set();
            let hourClassesSetFormat = new Set()

            for (let i = 0; i < rows.length; i++) {
                const temporalHour = parseInt(rows[i].time_start.slice(0, 2));
                const temporalHourF = parseInt(rows[i].time_finish.slice(0, 2));

                const temporalHourFormat = moment(rows[i].time_start, 'hh:mm:ss A').format('hh:mm A')
                const temporalHourFormatF = moment(rows[i].time_finish, 'hh:mm:ss A').format('hh:mm A')
                // console.log("temporalHourFormat", temporalHourFormat)

                hourClassesSet.add(temporalHour);

                if (temporalHour !== temporalHourF) {
                    hourClassesSet.add(temporalHourF);
                }

                if(temporalHourFormat !== temporalHourFormatF) {
                    hourClassesSetFormat.add(temporalHourFormat)
                    // console.log(hourClassesSetFormat)
                }
            }

            const roundDownToNearestQuarter = (time) => {
                const momentTime = moment(time, 'hh:mm A');
                const minutes = momentTime.minutes();
                const roundedMinutes = Math.floor(minutes / 15) * 15;
                return momentTime.minutes(roundedMinutes).format('hh:mm A');
            };
            
            

            // hourClassesArray = Array.from(hourClassesSet).sort((minorHour, higherHour) => minorHour - higherHour);
            // hourClassesArrayFormat = Array.from(hourClassesSetFormat).map(time => roundDownToNearestQuarter(time));
            
            // console.log("hourClassesArrayFormat", hourClassesArrayFormat);

            const hourClassesArrayFormat = Array.from(hourClassesSetFormat).map(time => roundDownToNearestQuarter(time));

            // Elimina duplicados y ordena el array final
            uniqueSortedArray = [...new Set(hourClassesArrayFormat)].sort((timeA, timeB) => {
                const momentA = moment(timeA, 'hh:mm A');
                const momentB = moment(timeB, 'hh:mm A');
                return momentA.isBefore(momentB) ? -1 : 1;
            });
            
            rowsParse = rows.map(row => {
                const startTime = roundDownToNearestQuarter(row.time_start);
                // const priceFormat = row.price_formatted.replace('.',',');
                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    day: row.day,
                    image: row.image,
                    description: row.description,
                    date: row.date_formatted,
                    price: row.price_formatted 
                    ? '€' + row.price_formatted.slice(0, -3).replace('.',',') + row.price_formatted.slice(-3)
                    : null,
                    hourCalendarClass: moment(startTime, 'hh:mm A').format('hh:mm A'),
                    timeStartParse: row.time_start.slice(0, 5),
                    timeFinishParse: row.time_finish.slice(0, 5),
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
                    time12hrsFinishFormat: moment(row.time_finish, 'hh:mm:ss A').format('hh:mm A'),
                    workshop: row.workshop,
                    uniqueSortedArray
                };
            });
        }

        // console.log("uniqueSortedArray", uniqueSortedArray)
        // console.log("rowsParse", rowsParse)

        return res.status(200).render("calendar", {
            positonMonth,
            weekDay,
            hourClassesArray,
            rowsParse,
            hourClassesArrayFormat,
            uniqueSortedArray
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const postEditClass = async (req, res) => {
    try {
        // console.log("req.params", req.params)
        // console.log("req.body", req.body)
        const id = parseInt(req.params.idCalendar)
        const newData = req.body.newData

        const params = []
        const values = []

        if (newData.newTitle) {
            params.push('title = ?');
            values.push(newData.newTitle);
        }

        if (newData.newTimeStart) {
            params.push('time_start = ?');
            values.push(newData.newTimeStart);
        }

        if (newData.newTimeFinish) {
            params.push('time_finish = ?');
            values.push(newData.newTimeFinish);
        }

        const [ result ] = await pool.query(`UPDATE calendar SET ${params.join(', ')} WHERE id_calendar = ?`, [...values, id])
        console.log(result)

        if(result) {
            return res.status(200).json({
                'message': 'class edited successfuly'
            })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            'message': 'Internal server error'
        })
    }
}

export const deleteClass = async (req, res) => {
    try {
        const id = parseInt(req.params.idCalendar)
        // console.log(id)

        const [ rows ] = await pool.query("DELETE FROM calendar WHERE id_calendar = ?", [id])

        // console.log("rows", rows)

        if(rows.affectedRows > 0) {
            return res.status(204).json({
                'message': 'class deleted successfuly'
            })
        }
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            'message': 'Internal server error'
        })
    }
asyncasync}

export const postNewClass = async (req, res) => {
    try {
        const data = req.body
        let dirPhotoCompressed = null

        if(req.file !== undefined) {
            upload(req, res, async(error) => {
                if(error instanceof multer.MulterError) {
                    console.log("Error from Multer:", error.message)
            return res.status(400).json({
                        message: 'An unexpected error has occurred, we will resolve it as soon as possible.'
                    })
                } else if(error) {
                    console.log("Unknown error:", error.message)
                    return res.status(400).json({
                        message: 'An unexpected error has occurred, we will resolve it as soon as possible.'
                    })
                }
            })
        }
        console.log("DAta:", data)
        //Compress image
        // console.log("req.file:", req.file)
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
        // console.log("fileCompress:", fileCompress)
        // console.log("fileUpload:", fileCompress.options.fileOut)
        
        const dirFolder = '../public/images/'
        const fileCompressedImage = req.file.filename
        dirPhotoCompressed = `${dirFolder}${fileCompressedImage}`
        // console.log("dirPhotoCompressed:", dirPhotoCompressed)
        
        const orderData = {
            title : data.title,
            description : data.description,
            image : dirPhotoCompressed,
            day : data.day,
            date: data.date,
            price: data.price,
            time_start : data.time_start,
            time_finish : data.time_finish,
            category : data.category,
            workshop : data.workshop
        }

        // console.log("orderData:", orderData)
        // console.log("orderPrice:", orderData.date)
        // req.file ? console.log("req.file:", req.file) : console.log("No existe req.file")

        

        // console.log(orderData)
        if (!req.file) {
            return res.status(400).send('No hay ningún archivo.');
        }
        // console.log("req.file.buffer.toString('base64')", req.file.buffer.toString('base64'))
        // console.log("req.body", req.body)
        
        // const { buffer } = req.file

        // console.log("buffer", buffer)

        const [ rows ] = await pool.query("INSERT INTO calendar SET title = ?, description = ?, image = ?, day = ?, date = ?, location = ?, price = ?, time_start = ?, time_finish = ?, category = ?, workshop = ?", [orderData.title, orderData.description, orderData.image, orderData.day, orderData.date, orderData.location, orderData.price, orderData.time_start, orderData.time_finish, orderData.category, orderData.workshop]);
        console.log("rows:", rows)
        
        return res.status(200).json({
            'message': 'postNewClass'
        })
    
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            'message': 'Internal server error'
        })
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

        console.log("fullDays to createClass:", fullDays);
        
        res.render("createClass", {
            weekDay,
            fullDays
        })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            'message': 'Internal server error'
        })
    }
}

export const postConfirmCreateClass = async (req, res) => {
    try {
        // let dayFreeIs = true
        const reqBody = req.body

        const data = {
            title: reqBody.title,
            description: reqBody.description,
            day: reqBody.day,
            time_start: reqBody.time_start,
            time_finish: reqBody.time_finish,
            category: 'class',
            workshop: reqBody.workshop === 'true' ? true : false
        };

        console.log("postConfirmCreateClass data:", data)

        const [ rows ] = await pool.query("INSERT INTO calendar SET title = ?, description = ?, image = null, day = ?, date = ?, location = null, price = null, time_start =?, time_finish = ?, category = ?, workshop = ?", [data.title, data.description, data.day, data.date, data.time_start, data.time_finish, data.category, data.workshop])

        return res.redirect("/")
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            'message': 'Internal server error'
        })
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
        console.log(error)
        return res.status(500).json({
            'message': 'Internal server error'
        })
    }
}

export const postConfirmCreateEvent = async(req, res) => {
    try {
        
        const reqBody = req.body
        const category = 'event'

        if (!req.file) {
            return res.status(400).json({
                message: 'No se proporcionó ningún archivo.'
            });
        }

        // console.log(req.body);
        // console.log(req.file);

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
        // console.log("fileCompress:", fileCompress)
        // console.log("fileUpload:", fileCompress.options.fileOut)
        
        const dirFolder = '../public/images/'
        const fileCompressedImage = req.file.filename
        const dirPhotoCompressed = `${dirFolder}${fileCompressedImage}`
        console.log("dirPhotoCompressed:", dirPhotoCompressed)

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

        console.log("data:", data)

        const [ rows ] = await pool.query("INSERT INTO calendar(title, description, image, day, date, location, price, time_start, time_finish, category, workshop) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [data.title, data.description, data.image, data.day, data.date, data.location, data.price, data.time_start, data.time_finish, data.category, data.workshop])

        return res.redirect('/')
        
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            'message': 'Internal server error'
        })
    }
}
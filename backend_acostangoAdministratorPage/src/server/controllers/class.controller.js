import { pool } from "../../../db.js";
import moment from 'moment';

//Create class
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

        const [rows] = await pool.query(`SELECT * FROM calendar WHERE category = 'class'`);
        const fullDays = {};

        if (rows && rows.length > 0) {
            rows.forEach(row => {
                const dayKey = row.day.toLowerCase();
                let eventFilter = ''
                row.category.toLowerCase() === 'class' ? eventFilter = row.category : 'a'

                if (!fullDays[dayKey]) {
                    fullDays[dayKey] = {
                        day: row.day,
                        classes: 1,
                    };
                } else if (fullDays[dayKey].classes < 3) {
                    fullDays[dayKey].classes += 1;
                }

                // console.log('FullDays:', fullDays);
            });
        }

        // console.log("fullDays to createClass:", fullDays);
        
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

        console.log(rows)

        return res.redirect("/")
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}

//Edit class
export const getEditClass = async (req,res) =>{
    try {
        let data = []
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

            data = rows.map(row => {
                return {
                    id_calendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    day: row.day,
                    price: row.price,
                    block: row.block,
                    time_start: moment(row.time_start, 'HH:mm:ss').format('HH:mm'),
                    time_finish: moment(row.time_finish, 'hh:mm:ss').format('HH:mm'),
                    category: row.category,
                    workshop: row.workshop
                }
            })
        }

        console.log("rows editClass:", rows)
        console.log("data editClass:", data)

        return res.status(200).render("editClass", {
            data: data[0],
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

//Delete class
export const deleteClass = async (req, res) => {
    try {
        const idCalendar = parseInt(req.params.idCalendar);

        const [ rows ] = await pool.query("DELETE FROM calendar WHERE id_calendar = ?", [idCalendar])

        if(rows.affectedRows > 0) {
            return res.status(204).json({
                'message': 'Class deleted successfuly'
            })
        }
    } catch(error) {
        console.error(error);
        res.render('error', { titlePage: 'An error has occurred' });
    }
}
import { pool } from "../../../db.js";
import moment from 'moment';

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

                const imageParse = '../public/images/' + row.image
                // console.log("imageParse:", imageParse)

                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    image: imageParse,
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
}
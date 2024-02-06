import { pool } from "../../../db.js";
import path from "path";
import { fileURLToPath } from "url";
import moment from 'moment';

export const getCalendar = async (req, res) => {
    try {
        const weekDay = [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
        ];

        let data = []

        const [ rows ] = await pool.query(`SELECT id_calendar, title, description, day, time_start, time_finish, category, workshop FROM calendar 
        WHERE category = 'class'
        ORDER BY CASE
            WHEN day = 'Monday' THEN 1
            WHEN day = 'Tuesday' THEN 2
            WHEN day = 'Wednesday' THEN 3
            WHEN day = 'Thursday' THEN 4
            WHEN day = 'Friday' THEN 5
            WHEN day = 'Saturday' THEN 6
            WHEN day = 'Sunday' THEN 7
            END`
            
        );

        if(rows && rows.length > 0) {
            data = rows.map(row => {
                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    description: row.description,
                    day: row.day,
                    timeStartParse: row.time_start,
                    timeFinishParse: row.time_finish,
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
                    time12hrsFinishFormat: row.time_finish !== null ? moment(row.time_finish, 'hh:mm:ss A').format('hh:mm A') : null,
                    workshop: row.workshop,
                    category: row.category
                };
            })
        }

        return res.status(200).json({
            data,
            weekDay,
        })

    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error. We are working to solve it",
        })
    }
}
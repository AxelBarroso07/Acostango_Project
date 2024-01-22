import { pool } from "../../../db.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import moment from 'moment'
import { time } from "console";

export const getIndex = async (req, res) => {
    try {
        return res.status(200).render("example");
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const postIndex = async (req, res) => {
    try {
        return res.status(200).json({
            message: "postIndex",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const updIndex = async (req, res) => {
    try {
        return res.status(200).json({
            message: "updIndex",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const delIndex = async (req, res) => {
    try {
        return res.status(200).json({
            message: "delIndex",
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const getCalendar = async (req, res) => {
    try {
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

        const [ rows ] = await pool.query(`SELECT * FROM calendar_class ORDER BY CASE
            WHEN day = 'Sunday' THEN 1
            WHEN day = 'Monday' THEN 2
            WHEN day = 'Tuesday' THEN 3
            WHEN day = 'Wednesday' THEN 4
            WHEN day = 'Thursday' THEN 5
            WHEN day = 'Friday' THEN 6
            WHEN day = 'Saturday' THEN 7
            END`);
        // console.log(rows)

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
                return {
                    idCalendar: row.id_calendar,
                    title: row.title,
                    day: row.day,
                    hourCalendarClass: moment(startTime, 'hh:mm A').format('hh:mm A'),
                    timeStartParse: row.time_start.slice(0, 5),
                    timeFinishParse: row.time_finish.slice(0, 5),
                    time12hrsStartFormat: moment(row.time_start, 'hh:mm A').format('hh:mm A'),
                    time12hrsFinishFormat: moment(row.time_finish, 'hh:mm:ss A').format('hh:mm A'),
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
        console.log("req.params", req.params)
        console.log("req.body", req.body)
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

        const [ result ] = await pool.query(`UPDATE calendar_class SET ${params.join(', ')} WHERE id_calendar = ?`, [...values, id])
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

        const [ rows ] = await pool.query("DELETE FROM calendar_class WHERE id_calendar = ?", [id])

        console.log("rows", rows)

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
}

export const postNewClass = async (req, res) => {
    try {
        const newClass = req.body.newClass;

        console.log(newClass)

        const title = newClass.title
        const day = newClass.day
        const time_start = newClass.time_start
        const time_finish = newClass.time_finish

        const [ rows ] = await pool.query("INSERT INTO calendar_class SET title = ?, day = ?, time_start = ?, time_finish = ?", [title, day, time_start, time_finish]);
        // console.log("rows", rows)
        
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
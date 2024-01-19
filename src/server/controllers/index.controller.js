import { pool } from "../../../db.js";
import path from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";

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
        console.log(rows)

        //Format hour classes
        let hourClassesSet = new Set();

        for (let i = 0; i < rows.length; i++) {
            const temporalHour = parseInt(rows[i].time_start.slice(0, 2));
            const temporalHourF = parseInt(rows[i].time_finish.slice(0, 2));

            hourClassesSet.add(temporalHour);

            if (temporalHour !== temporalHourF) {
                hourClassesSet.add(temporalHourF);
            }
        }

        let hourClassesArray = Array.from(hourClassesSet).sort((minorHour, higherHour) => minorHour - higherHour);
        // console.log("hourClassesArray", hourClassesArray);

        return res.status(200).render("calendar", {
            positonMonth,
            weekDay,
            hourClassesArray,
            rows
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

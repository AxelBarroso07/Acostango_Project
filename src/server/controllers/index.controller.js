import { pool } from '../../../db.js';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';

export const getIndex = async (req, res) => {
    try {
        
        return res.status(200).render("example")
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const postIndex = async (req, res) => {
    try {
        return res.status(200).json({
            message: "postIndex"
        })
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const updIndex = async (req, res) => {
    try {
        return res.status(200).json({
            message: "updIndex"
        })
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const delIndex = async (req, res) => {
    try {
        return res.status(200).json({
            message: "delIndex"
        })
    } catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

export const getCalendar = async (req, res) => {
    try {
        const date = new Date()
        
        const year = date.getFullYear()
        const month = date.getMonth()

        const nameMonth = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        const positonMonth = nameMonth[date.getMonth()]

        function daysOfTheMonth(currentYear, currentMonth){
            const startDate = new Date(currentYear, currentMonth, 1)
            const endDate = new Date(currentYear, currentMonth + 1, 1)
            let dates = []
            while(startDate < endDate) {
                dates.push(new Date(startDate))
                startDate.setDate(startDate.getDate() + 1)
            }
                return dates
            }
        
        
        const daysMonth = daysOfTheMonth(year, month)
        const lengthDaysMonth = daysMonth.length
        console.log(lengthDaysMonth)
        // console.log(daysMonth)
        // console.log(date)
        // console.log(nameMonth)
        return res.status(200).render("calendar", { positonMonth, daysMonth, lengthDaysMonth })
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}
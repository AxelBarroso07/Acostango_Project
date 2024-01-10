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
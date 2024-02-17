import nodemailer from 'nodemailer';
import { GMAIL_APPS_PASSWD, GMAIL_APPS_USER } from '../../../config.js';

export const postSendEmail = async (req, res) => {
    try {
        console.log(req.body)
        const { name, email, subject, message } = req.body
        
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: GMAIL_APPS_USER,
                pass: GMAIL_APPS_PASSWD
            }
        });

        const mailOptions = {
            from: email,
            to: GMAIL_APPS_USER,
            subject: subject,
            text: message
          };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                console.log("Error en el envío del correo electrónico", error);
                return res.status(500).json({
                    isSendMail: false
                });
            } else {
                console.log('Correo electrónico enviado: ' + info.response)

                return res.status(200).json({
                    isSendMail: true
                })
            }
        });
    } catch(error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error. We are working to solve it",
        })
    }
}
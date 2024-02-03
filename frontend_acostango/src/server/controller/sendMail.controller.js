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
            from: GMAIL_APPS_USER,
            to: email,
            subject: subject,
            html: `
              <div style='background-color: #000; color: #fff; padding: 20px; box-sizing: border-box; width: auto; max-width: 600px; margin: 0 auto; min-height: 100px; max-height: 300px; overflow: auto;'>
                <h2>Datos de contacto:</h2>
                <p>Name: ${name}</p>
                <p>Email: ${email}</p>
                <p>Subject: ${subject}</p>
                <p>Message: ${message}</p>
              </div>
            `
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
        res.status(500).json({
            "message": "Internal server error: " + error
        })
    }
}
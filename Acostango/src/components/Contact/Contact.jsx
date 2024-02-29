import React, { useState, useEffect } from 'react'
import '../Contact/Contact.css'
import { MapView } from '../MapView/MapView'
import i18n from '../../Translation/i18n.js';
import { useTranslation } from 'react-i18next';

function Contact() {
  const { t } = useTranslation('translation');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isMailSend, setIsMailSend] = useState(false);

  const fetchSendMail = async () => {
    try {
      const HOST = import.meta.env.VITE_BACKEND_HOST;
      const PORT = import.meta.env.VITE_PORT_SERVER;
      const definitivePort = PORT ? `:${PORT}` : ''
      const VITE_PROTOCOL = import.meta.env.VITE_PROTOCOL;

      const response = await fetch(`${VITE_PROTOCOL}://${HOST}${definitivePort}/sendMail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message
        })
      })

      if (response.ok) {
        console.log('Correo enviado con éxito');
        console.log("response:", response)
        setIsMailSend(true)
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        console.error('Error al enviar el correo');
      }
    } catch(error) {
      console.log(error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <section className='contact' id='contact'>
      <h1 className='contact__title'>{t("contact.title")}</h1>
      <div className="container__contact">
        <div className="contact__map">
          <MapView />
          <a className='a__mapview' href="https://maps.app.goo.gl/3WCRktNn9kqWEV5U7" target='_blank'>Schönbrunner Str. 58, Vienna</a>
        </div>
        <div className="form">
          <form action="">
            <input type='text' name='nombre' id="" value={name} onChange={(e) => { setName(e.target.value), setIsMailSend(false) }} placeholder={t("contact.form.name")} />
            <input type='mail' name='correo' id="" value={email} onChange={(e) => { setEmail(e.target.value), setIsMailSend(false) }} placeholder={t("contact.form.email")} />
            <input type='text' name="" id="" value={subject} onChange={(e) => { setSubject(e.target.value), setIsMailSend(false) }} placeholder={t("contact.form.subject")} />
            <textarea type='message' name='mensaje' id="" value={message} onChange={(e) => { setMessage(e.target.value), setIsMailSend(false) }} placeholder={t("contact.form.message")} />
            <input type='button' name='enviar' value={t("contact.form.send")} id="" onClick={fetchSendMail} />
            {
              isMailSend
              ?
              (
                <p className='mail__send__message'>{t("emailmessage")}</p>
              )
              :
              (
                <span></span>
              )
            }
          </form>
        </div>
      </div>
      
    </section>
  )
}

export default Contact 
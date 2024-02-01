import React from 'react'
import '../Contact/Contact.css'
import { MapView } from '../MapView/MapView'

function Contact() {    
  return (
    <section className='contact'>
      <h1 className='contact__title'>CONTACT</h1>
      <div className="container__contact">
        <div className="contact__map">
          <MapView />
          <a className='a__mapview' href="https://maps.app.goo.gl/3WCRktNn9kqWEV5U7">Schönbrunner Str. 58, Vienna</a>
        </div>
        <div className="form">
          <form action="">
            <input type="text" name="nombre" id="" placeholder='NAME'/>
            <input type="mail" name="correo" id="" placeholder='EMAIL'/>
            <input type="text" name="" id="" placeholder='SUBJECT'/>
            <textarea type="message" name="mensaje" id="" placeholder='MESSAGE'/>
            <input type="button" name="enviar" value="SEND" id="" />
          </form>
        </div>
      </div>
      <div className="contact__social-media" id='contact'>
        <a className='a__link maps' href="https://maps.app.goo.gl/37D5iPg8QjRQRed7A">maps<svg xmlns="http://www.w3.org/2000/svg" className="icon-map" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg></a>
        <a className='a__link wzp' href="#">whatsapp<svg xmlns="http://www.w3.org/2000/svg" className="icon-whatsapp" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg></a>
        <a className='a__link call' href="#">call<svg xmlns="http://www.w3.org/2000/svg" className="icon-phone" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg></a>
        <a className='a__link mail' href="#">email<svg xmlns="http://www.w3.org/2000/svg" className="icon-mail" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg></a>
      </div>
      
    </section>
  )
}

export default Contact 
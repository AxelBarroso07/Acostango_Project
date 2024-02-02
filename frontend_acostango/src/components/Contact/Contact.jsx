import React from 'react'
import '../Contact/Contact.css'
import { MapView } from '../MapView/MapView'

function Contact() {    
  return (
    <section className='contact' id='contact'>
      <h1 className='contact__title'>CONTACT</h1>
      <div className="container__contact">
        <div className="contact__map">
          <MapView />
          <a className='a__mapview' href="https://maps.app.goo.gl/3WCRktNn9kqWEV5U7" target='_blank'>Schönbrunner Str. 58, Vienna</a>
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
      
    </section>
  )
}

export default Contact 
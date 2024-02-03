import React from 'react'
import NavBar from '../components/NavBar/NavBar'

function PageEvents() {
  return (
    <div className="container__events">
      <NavBar />
      <h1 className="events__title">EVENTS</h1>
      <div className="container__event">
        <div className="event">
          <img src="" alt="image-event" className="image__event" />
          <h2 className="title__event">TANGO STRONG</h2>
          <p className="description__event">show de tango por mariano aguiar</p>
          <div className="dates__event">
            <p className='dates__event ubi'>Villa Dominico</p>
              <p className='dates__event date'>12/10/2024</p>
              <p className='dates__event time'>18HS</p>
              <p className='dates__event price'>1000 €</p>
            </div>
        </div>
        <div className="event">
          <img src="" alt="image-event" className="image__event" />
          <h2 className="title__event">TANGO STRONG</h2>
          <p className="description__event">show de tango por mariano aguiar</p>
          <div className="dates__event">
            <p className='dates__event ubi'>Villa Dominico</p>
            <p className='dates__event date'>12/10/2024</p>
            <p className='dates__event time'>18HS</p>
            <p className='dates__event price'>1000 €</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageEvents
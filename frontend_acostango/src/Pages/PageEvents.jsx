import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageEvents.css'

function PageEvents() {

  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);
  
  const fetchDataClasses = useCallback(async () => {
    try {
      const HOST = import.meta.env.VITE_DB_HOST;
      const PORT = import.meta.env.VITE_PORT_SERVER;

      const response = await fetch(`http://${HOST}:${PORT}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      console.log("Data events:", result);

      const eventsData = result.data
      // console.log("eventsData:", eventsData);

      setData(eventsData);
    } catch (error) {
      console.log(error)
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDataClasses();
  }, [fetchDataClasses]);

  return (
    <div>
      <NavBar />
      <div className="container__events">
        <h1 className="events__title">EVENTS</h1>
        <div className="container__event">
          <div className="event">
            <div className='container__img'>
              <img src="../src/assets/image/image-classes.png" alt="image-event" className="image__event" />
            </div>
            <h2 className="title__event">TANGO STRONG</h2>
            <p className="description__event">SHOW DE TANGO POR MARIANO AGUIAR</p>
            <div className="dates__event">
              <p className='dates__event ubi'>Villa Dominico</p>
                <p className='dates__event date'>12/10/2024</p>
                <p className='dates__event time'>18HS</p>
                <p className='dates__event price'>1000 €</p>
              </div>
          </div>
          <div className="event">
            <div className='container__img'>
              <img src="../src/assets/image/image-classes.png" alt="image-event" className="image__event" />
            </div>
            <h2 className="title__event">TANGO STRONG</h2>
            <p className="description__event">SHOW DE TANGO POR MARIANO AGUIAR</p>
            <div className="dates__event">
              <p className='dates__event ubi'>Villa Dominico</p>
              <p className='dates__event date'>12/10/2024</p>
              <p className='dates__event time'>18HS</p>
              <p className='dates__event price'>1000 €</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageEvents
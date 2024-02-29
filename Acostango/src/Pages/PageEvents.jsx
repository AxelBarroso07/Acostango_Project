import React, { useState, useEffect, useCallback } from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageEvents.css'
import i18n from '../Translation/i18n.js';
import { useTranslation } from 'react-i18next';

function PageEvents() {
  const { t } = useTranslation('translation');
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);
  
  const fetchDataClasses = useCallback(async () => {
    try {
      const HOST = import.meta.env.VITE_BACKEND_HOST;
      const PORT = import.meta.env.VITE_PORT_SERVER;
      const definitivePort = PORT ? `:${PORT}` : ''
      const VITE_PROTOCOL = import.meta.env.VITE_PROTOCOL;

      const response = await fetch(`${VITE_PROTOCOL}://${HOST}${definitivePort}/events`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      // console.log("Data events:", result);

      const eventsData = result.data
      console.log("eventsData:", eventsData);

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
        <h1 className="events__title">{t("events.title")}</h1>
        <div className="container__event">

          {
            data && data.length > 0
            &&
              (
                data.map(itemEvent => (
                    <div key={itemEvent.idCalendar} className="event">
                      <div className="container__img">
                        <img src={`src/assets/imageEvents/${itemEvent.image}`} alt={itemEvent.title} className="image__event" />
                      </div>
                      <h2 className="title__event">
                        {itemEvent.title}
                      </h2>
                      <p className="description__event">
                        {itemEvent.description}
                      </p>
                      <div className="dates__event">
                        <p className="dates_event">
                          {itemEvent.location}
                        </p>
                        <p className="dates_event">
                          {itemEvent.date}
                        </p>
                        <p className="dates_event">
                          {itemEvent.time12hrsStartFormat}
                        </p>
                        <p className="dates_event">
                          {itemEvent.price}
                        </p>
                      </div>
                    </div>
                ))
              )
          }
        </div>
      </div>
    </div>
  )
}

export default PageEvents

// <div className="event">
//   <div className='container__img'>
//     <img src="../src/assets/image/image-classes.png" alt="image-event" className="image__event" />
//   </div>
//   <h2 className="title__event">TANGO STRONG</h2>
//   <p className="description__event">SHOW DE TANGO POR MARIANO AGUIAR</p>
//   <div className="dates__event">
//     <p className='dates__event ubi'>Villa Dominico</p>
//       <p className='dates__event date'>12/10/2024</p>
//       <p className='dates__event time'>18HS</p>
//       <p className='dates__event price'>1000 €</p>
//     </div>
// </div>


// <div className="event">
//   <div className='container__img'>
//     <img src="../src/assets/image/image-classes.png" alt="image-event" className="image__event" />
//   </div>
//   <h2 className="title__event">TANGO STRONG</h2>
//   <p className="description__event">SHOW DE TANGO POR MARIANO AGUIAR</p>
//   <div className="dates__event">
//     <p className='dates__event ubi'>Villa Dominico</p>
//     <p className='dates__event date'>12/10/2024</p>
//     <p className='dates__event time'>18HS</p>
//     <p className='dates__event price'>1000 €</p>
//   </div>
// </div>
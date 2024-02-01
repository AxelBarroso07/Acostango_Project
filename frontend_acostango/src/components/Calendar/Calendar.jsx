import React, { useState, useEffect } from 'react'
import '../Calendar/Calendar.css'
// import { PORT, PORT_VITE, DB_HOST } from '../../../config.js';

function Calendar() {
  //   const [ data, setData ] = useState(null);
  //   const [ loading, setLoading ] = useState(null);
  //   const [ error, setError ] = useState(null);
  
  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         const response = await fetch(`http://${DB_HOST}:${PORT_VITE}/`, {
  //           'method': 'GET',
  //           'headers': {
  //             'Content-Type': 'application/json'
  //           }
  //         })

  //         if (!response.ok) {
  //           throw new Error('Error al obtener los datos');
  //         }

  //         const datos = await response.json();
  //         setData("datos", datos);

  //       } catch(error) {
  //         console.log("josepardo");
  //         console.log("mari aguilera");
  //         setError(error.message);
  //       } finally {
  //         setLoading(false);
  //       }
  //     }

  //     fetchData()

  // }, [])

  return (
    <section className='calendar'>
      <h1 className='calendar__title'>CALENDAR</h1>
    </section>
  )
}

export default Calendar
import React, { useState, useEffect } from 'react';
import '../Calendar/Calendar.css';

function Calendar() {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(null)
  const [ error, setError ] = useState(null)

  useEffect(() => {
    const fetchDataCalendar = async () => {
      try {

        const HOST = import.meta.env.VITE_DB_HOST;
        const PORT = import.meta.env.VITE_PORT_SERVER;

        const response = await fetch(`http://${HOST}:${PORT}/events`, {
          'method': 'GET',
          'headers': {
            'Content-Type': 'application/json'
          }
        })

        const data = await response.json()
        console.log("Data calendar:", data)
      } catch(error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }

    fetchDataCalendar()
  }, [])

  if(loading) {
    return <p>Cargando</p>;
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  return (
    <section className='calendar'>
      <h1 className='calendar__title'>CALENDAR</h1>
    </section>
  )
}

export default Calendar
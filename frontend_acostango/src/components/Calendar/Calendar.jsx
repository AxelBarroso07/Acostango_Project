import React, { useState, useEffect, useCallback } from 'react';
import '../Calendar/Calendar.css';

function Calendar() {
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);

  const fetchDataCalendar = useCallback(async () => {
    try {
      const HOST = import.meta.env.VITE_DB_HOST;
      const PORT = import.meta.env.VITE_PORT_SERVER;

      const response = await fetch(`http://${HOST}:${PORT}/calendar`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      // console.log("Data calendar:", result);

      const fetchedData = result.data

      setData(fetchedData);
    } catch (error) {
      console.log(error)
    }
  }, []);

  useEffect(() => {
    fetchDataCalendar();
  }, [fetchDataCalendar]);

  return (
    <section className='calendar'>
      <h1 className='calendar__title'>CALENDAR</h1>
      {data && data.length > 0 ? (
        <ul>
          {data.map(item => (
            <li key={item.idCalendar}>
              <p>{item.idCalendar}</p>
              <p>{item.title}</p>
              <p>{item.description}</p>
              <p>{item.day}</p>
              <p>{item.time12hrsStartFormat}</p>
              <p>{item.time12hrsStartFormat}</p>
              <p>{item.workshop}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay datos disponibles</p>
      )}
    </section>
  )
}

export default Calendar
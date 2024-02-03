import React, { useState, useEffect, useCallback } from 'react';
import '../Calendar/Calendar.css';

function Calendar() {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(null)
  const [ error, setError ] = useState(null)

  // const fetchDataCalendar = useCallback(async () => {
  //   try {
  //     const HOST = import.meta.env.VITE_DB_HOST;
  //     const PORT = import.meta.env.VITE_PORT_SERVER;

  //     const response = await fetch(`http://${HOST}:${PORT}/calendar`, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json'
  //       }
  //     });

  //     const result = await response.json();
  //     console.log("Data calendar:", result);

  //     const fetchedData = result.data

  //     setData(fetchedData);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchDataCalendar();
  // }, [fetchDataCalendar]);

  return (
    <section className='calendar'>
      <h1 className='calendar__title'>CALENDAR</h1>
    </section>
  )
}

export default Calendar
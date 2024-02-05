import React, { useState, useEffect, useCallback } from 'react';
import '../Calendar/Calendar.css';

function Calendar() {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(null)
  const [ error, setError ] = useState(null)
  const [ weekDay, setWeek ] = useState(null)

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
      console.log("Data calendar:", result);

      const fetchedData = result.data

      const fetchWeekDay = result.weekDay
      setWeek(fetchWeekDay)

      setData(fetchedData);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataCalendar();
  }, [fetchDataCalendar]);

  return (
    <section className='calendar'>
      <h1 className='calendar__title'>CALENDAR</h1>
      <div className='container__calendar'>
        {weekDay &&
          weekDay.map((day, index) => (
            <div className='container__table' key={index}>
              <th className='title__day'>{day}</th>
              <div className='container__day'>
                {data &&
                  data.map((item) => {
                    if (item.day === day) {
                      return ( 
                        <div key={item.idCalendar}>
                          <p className='table__hstitle-class'>{item.title}</p>
                          <div className='container__hora'>
                            <p className='table__hsstart'>{item.time12hrsStartFormat}</p>
                            <p className='table__hsfinish'>{item.time12hrsFinishFormat}</p>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
              </div>
            </div>
          ))}
      </div>
    </section>
  )
}

export default Calendar
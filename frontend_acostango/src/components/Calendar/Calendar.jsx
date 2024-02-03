import React, { useState, useEffect, useCallback } from 'react';
import '../Calendar/Calendar.css';

function Calendar() {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(null)
  const [ error, setError ] = useState(null)

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

  if(loading) {
    return <p>Cargando</p>;
  }

  if(error) {
    return <p>Error: {error}</p>
  }

  return (
    <section className='calendar'>
      <h1 className='calendar__title'>CALENDAR</h1>
      {data && data.length > 0 ? (
        <div className='container__table'>
          {data.map(item => (
            <table key={item.idCalendar}>
              <tr className='rows'>
                <th className='table__day'>{item.day}</th>
                <th className='table__title'>{item.title}</th>
                <p className='table__description'>{item.description}</p>
                <td className='table__horario'>
                  <td>{item.time12hrsStartFormat}</td>
                  <td>{item.time12hrsStartFormat}</td>
                </td>
                <p className='table__workshop'>{item.workshop}</p>
              </tr>
            </table>
          ))}
        </div>
      ) : (
        <p>No hay datos disponibles</p>
      )}
    </section>
  )
}

export default Calendar
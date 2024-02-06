import React, { useState, useEffect, useCallback } from 'react'
import '../Pages/PageClasses.css'
import NavBar from '../components/NavBar/NavBar'

function PageClasses() {
  const [ data, setData ] = useState(null);
  const [ error, setError ] = useState(null);
  
  const fetchDataClasses = useCallback(async () => {
    try {
      const HOST = import.meta.env.VITE_DB_HOST;
      const PORT = import.meta.env.VITE_PORT_SERVER;

      const response = await fetch(`http://${HOST}:${PORT}/classes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      // console.log("Data classes:", result);

      const classesData = result.data
      // console.log("classData:", classesData);

      const groupedClasses = {};

      classesData.forEach(item => {
        if (!groupedClasses[item.title]) {
          groupedClasses[item.title] = [];
        }
        groupedClasses[item.title].push(item);
      });

      setData(groupedClasses);
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
      <NavBar/>
      <div className='container__clases'>
        <div className="container__image-clases">
          <img src="../src/assets/image/image-classes.png" alt="img-classes" className='image__classes' />
        </div>
        <h1 className="classes__title">CLASSES</h1>
        <div className="container__info">
        {
          data && Object.keys(data).length > 0
            ? (
              Object.keys(data).map(title => {
                const uniqueDescriptions = [...new Set(data[title].map(item => item.description))];

                return (
                  <div key={title} className="container__block">
                    <h2 className="title_block">{title}</h2>
                    {
                      uniqueDescriptions.map((description, index) => {
                        const classesWithSameDescription = data[title].filter(item => item.description === description);

                        return (
                          <>
                            <p className="description__block">
                              {description}
                            </p>
                            <div className="horario__block">
                              <table className="table__block">
                                {
                                  classesWithSameDescription.map((classItem, idx) => (
                                    <tr key={idx}>
                                      {classItem.day}: {classItem.time12hrsStartFormat} to {classItem.time12hrsFinishFormat} {classItem.price && <span className="precio">{classItem.price}</span>}
                                    </tr>
                                  ))
                                }
                                {
                                  classesWithSameDescription.length > 0 && (
                                    <>
                                      {
                                        classesWithSameDescription[classesWithSameDescription.length - 1].block && classesWithSameDescription[classesWithSameDescription.length - 1].block !== null
                                        &&
                                          (
                                            <tr>
                                              Block of 10 classes 
                                              {
                                                classesWithSameDescription[classesWithSameDescription.length - 1].block
                                                &&
                                                  (
                                                    <span className='precio'>
                                                      {
                                                        classesWithSameDescription[classesWithSameDescription.length - 1].block
                                                      }
                                                    </span>
                                                  )
                                              }
                                            </tr>
                                          )
                                      }
                                    </>
                                  )
                                }
                              </table>
                            </div>
                          </>
                        );
                      })
                    }
                  </div>
                );
              })
            )
            : (
              <p>No hay clases disponibles</p>
            )
        }

        </div>

        {/* <div className="container__info">
          <div className="container__block">
              <h2 className="title__block">Begginers</h2>
              <p className="description__block">Estas clases están orientadas para personas que ya tiene experiencia en el baile del tango. 
                Es necesario venir en pareja para tomar las clases de avanzados. En esta clase se manejan conceptos técnicos y movimientos complejos de Tango. Te esperamos!!!
              </p>
              <div className="horario__block">
                <table className='table__block'>
                  <tr>Miércoles: 18:00 a 19:00 <span className='precio'>15 €</span></tr>
                  <tr>Viernes: 19:00 a 21:00 <span className='precio'>25 €</span></tr>
                  <tr>Estudiantes <span className='precio'>15 €</span></tr>
                  <tr>Block de 10 clases <span className='precio'>180 €</span></tr>
                </table>
              </div>
          </div>
          <div className="container__block">
            <h2 className="title__block">Intermediate & Advanced</h2>
            <p className="description__block">Estas clases están orientadas para personas que ya tiene experiencia en el baile del tango. Es necesario venir en pareja para tomar 
              las clases de avanzados. En esta clase se manejan conceptos técnicos y movimientos complejos de Tango. Te esperamos!!!
            </p>
            <div className="horario__block">
                <table className='table__block'>
                  <tr>Miércoles: 18:00 a 19:00 <span className='precio'>15 €</span></tr>
                  <tr>Viernes: 19:00 a 21:00 <span className='precio'>25 €</span></tr>
                  <tr>Estudiantes <span className='precio'>15 €</span></tr>
                  <tr>Block de 10 clases <span className='precio'>180 €</span></tr>
                </table>
              </div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default PageClasses
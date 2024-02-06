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
            && (
              Object.keys(data).map(title => {
                const uniqueDescriptions = [...new Set(data[title].map(item => item.description))];

                return (
                  <div key={title} className="container__block">
                    <h2 className="title__block">{title}</h2>
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
          }
        </div>
      </div>
    </div>
  )
}

export default PageClasses
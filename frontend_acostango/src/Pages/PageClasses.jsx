import React, { useState, useEffect, useCallback } from 'react'
import '../Pages/PageClasses2.css'
import NavBar from '../components/NavBar/NavBar'

function PageClasses() {
  const [ data, setData ] = useState(null);
  const [ allData, setAllData ] = useState(null);

  const [ groupClassWorkshop, setGroupClassWorkshop ] = useState([])
  
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
      setAllData(classesData)

      const groupedClasses = {};

      classesData.forEach(item => {
        if (!groupedClasses[item.title]) {
          groupedClasses[item.title] = [];
        }
        groupedClasses[item.title].push(item);
      });

      setData(groupedClasses);
    } catch (error) {
      console.log(error.message)
    }
  }, []);

  useEffect(() => {
    fetchDataClasses();
  }, [fetchDataClasses]);

  useEffect(() => {
    if (allData) {
      const classes = {};
      const workshops = {};

      allData.forEach(data => {
        if (data.workshop) {
          if (!workshops[data.title]) {
            workshops[data.title] = [];
          }
          workshops[data.title].push(data);
        } else {
          if (!classes[data.title]) {
            classes[data.title] = [];
          }
          classes[data.title].push(data);
        }
      });

      setGroupClassWorkshop({ classes, workshops });
    }
  }, [allData]);

  
  return (
    <div>
      <NavBar />
      <div className="container__clases">
        <div className="container__image-clases">
          <img src="../src/assets/image/image-classes.png" alt="img-classes" className="image__classes" />
        </div>
        <h1 className="classes__title">CLASSES</h1>
        <div className="container__info-2">
          {groupClassWorkshop.classes &&
            Object.keys(groupClassWorkshop.classes).length > 0 &&
            Object.keys(groupClassWorkshop.classes).map(title => {
              const uniqueDescriptions = [...new Set(groupClassWorkshop.classes[title].map(item => item.description))];
              return (
                <div key={title} className="container__block-2">
                  <h2 className="title__block">{title}</h2>
                  {uniqueDescriptions.map((description, index) => {
                    const classesWithSameDescription = groupClassWorkshop.classes[title].filter(
                      item => item.description === description
                    );
                    return (
                      <React.Fragment key={description}>
                        <p className="description__block">{description}</p>
                        <div className="horario__block">
                          <table className="table__block">
                            {classesWithSameDescription.map((classItem, idx) => (
                              <tr key={idx}>
                                <td>{classItem.day}:</td>
                                <td>
                                  {classItem.time12hrsStartFormat} to {classItem.time12hrsFinishFormat}{' '}
                                  {classItem.price && <span className="precio">{classItem.price}</span>}
                                </td>
                              </tr>
                            ))}
                            {classesWithSameDescription.length > 0 && (
                              <React.Fragment key={'block'}>
                                {classesWithSameDescription[classesWithSameDescription.length - 1].block &&
                                  classesWithSameDescription[classesWithSameDescription.length - 1].block !== null && (
                                    <tr>
                                      <td colSpan="2">
                                        Block of 10 classes{' '}
                                        {classesWithSameDescription[classesWithSameDescription.length - 1].block && (
                                          <span className="precio">
                                            {classesWithSameDescription[classesWithSameDescription.length - 1].block}
                                          </span>
                                        )}
                                      </td>
                                    </tr>
                                  )}
                              </React.Fragment>
                            )}
                          </table>
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
              );
            })}
          </div>

          <h1 className="classes__title">WORKSHOPS</h1>
          <div className="container__info">
            {groupClassWorkshop.workshops &&
              Object.keys(groupClassWorkshop.workshops).length > 0 &&
              Object.keys(groupClassWorkshop.workshops).map(title => {
                const uniqueDescriptions = [...new Set(groupClassWorkshop.workshops[title].map(item => item.description))];
                return (
                  <div key={title} className="container__block">
                    <h2 className="title_block">{title}</h2>
                    {uniqueDescriptions.map((description, index) => {
                      const workshopsWithSameDescription = groupClassWorkshop.workshops[title].filter(
                        item => item.description === description
                      );
                      return (
                        <React.Fragment key={description}>
                          <p className="description__block">{description}</p>
                          <div className="horario__block">
                            <table className="table__block">
                              {workshopsWithSameDescription.map((workshopItem, idx) => (
                                <tr key={idx}>
                                  <td>{workshopItem.day}:</td>
                                  <td>
                                    {workshopItem.time12hrsStartFormat} to {workshopItem.time12hrsFinishFormat}{' '}
                                    {workshopItem.price && <span className="precio">{workshopItem.price}</span>}
                                  </td>
                                </tr>
                              ))}
                              {workshopsWithSameDescription.length > 0 && (
                                <React.Fragment key={'block'}>
                                  {workshopsWithSameDescription[workshopsWithSameDescription.length - 1].block &&
                                    workshopsWithSameDescription[workshopsWithSameDescription.length - 1].block !== null && (
                                      <tr>
                                        <td colSpan="2">
                                          Block of 10 workshops{' '}
                                          {workshopsWithSameDescription[workshopsWithSameDescription.length - 1].block && (
                                            <span className="precio">
                                              {workshopsWithSameDescription[workshopsWithSameDescription.length - 1].block}
                                            </span>
                                          )}
                                        </td>
                                      </tr>
                                    )}
                                </React.Fragment>
                              )}
                            </table>
                          </div>
                        </React.Fragment>
                      );
                    })}
                  </div>
                );
            })}
          </div>
        
      </div>
    </div>
  );
}

export default PageClasses
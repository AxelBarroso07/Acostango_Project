import {React, useCallback, useEffect, useState} from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageMilonga.css'
import i18n from '../Translation/i18n.js';
import { useTranslation } from 'react-i18next';

import ImageMilonga from '../assets/image/page-milonga.jpg'

function PageMilonga() {
  const [ data, setData ] = useState(null)
  const [ loading, setLoading ] = useState(null)
  const [ error, setError ] = useState(null)
  const { t } = useTranslation('translation');

  const fetchDataMilonga = useCallback(async () => {
    try {
      const HOST = import.meta.env.VITE_DB_HOST;
      const PORT = import.meta.env.VITE_PORT_SERVER ? import.meta.env.VITE_PORT_SERVER : '';
      const PROTOCOL = import.meta.env.VITE_PROTOCOL;

      const response = await fetch(`${PROTOCOL}://${HOST}${PORT}/milonga`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const result = await response.json();
      console.log("Data milonga:", result);

      const fetchedData = result.data
      setData(fetchedData);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDataMilonga();
  }, [fetchDataMilonga]);

  return (
    <div>
      <NavBar/>
      <div className='container__milonga'>
        <div className="container__image-milonga">
          <img src={ImageMilonga} alt="img-classes" className='image__milonga' />
        </div>
        <h1 className="milonga__title">{t("milonga.title")}</h1>

        <div className='container__milongas'>
          {data &&
                    data.map((item) => {
                        return ( 
                          <div key={item.idMilonga} className='milong'>
                            <h1  className="milonga__title-3">{item.title}</h1>
                              <div className="container__info-3">
                                <div className="container__block-3">
                                  <p className="description__block-3">{item.description}</p>
                                    <div className="horario__block-3">
                                      <table className='table__block-3'>
                                      <tr className='tr-3'>{item.day}: {item.time12hrsStartFormat} - {item.time12hrsFinishFormat} <span className='precio-3'> {item.price} </span></tr>
                                      </table>
                                    </div>
                              </div>
                            </div>
                          </div>
                        );
                    })}
        </div>
      </div>
    </div>
  )
}

export default PageMilonga
import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageMilonga.css'
import i18n from '../Translation/i18n.js';
import { useTranslation } from 'react-i18next';

function PageMilonga() {

  const { t } = useTranslation('translation');

  return (
    <div>
      <NavBar/>
      <div className='container__milonga'>
        <div className="container__image-milonga">
          <img src="../src/assets/image/page-milonga.jpg" alt="img-classes" className='image__milonga' />
        </div>
        <h1 className="milonga__title-3">{t("milonga.title")}</h1>
        <div className="container__info-3">
          <div className="container__block-3">
              <p className="description__block-3">{t("milonga.description")}</p>
              <div className="horario__block-3">
                <table className='table__block-3'>
                  <tr className='tr-3'>{t("milonga.day")}: 19:00 - 22:00 <span className='precio-3'>10 €</span></tr>
                </table>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageMilonga
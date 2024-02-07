import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageRent.css'
import i18n from '../Translation/i18n.js';
import { useTranslation } from 'react-i18next';

function PageRent() {
  const { t } = useTranslation('translation');
  return (
    <div>
    <NavBar/>
      <div className='container__rent'>
        <h1 className="rent__title">{t("studio.title")}</h1>
        <div className="container__slider-images">
          <div className='container__image-1'><img src="../src/assets/image/image-rent.png" alt="img__studio-1" className='img__studio-1'/></div>
          <div className='container__column'>
            <div className='container__image-2'><img src="../src/assets/image/image-rent.png" alt="img__studio-2" className='img__studio-2'/></div>
            <div className='container__image-3'>
              <div className='container__vermas'>
            </div></div>
          </div>
        </div>
        
        <div className="container__description-studio">
          <ul className='container__items'>
            <li className='li__item'>- {t("studio.features.dimensions")}</li>
            <li className='li__item'>- {t("studio.features.floor")}</li>
            <li className='li__item'>- {t("studio.features.wall")}</li>
            <li className='li__item'>- {t("studio.features.ventilation")}</li>
            <li className='li__item'>- {t("studio.features.privacity")}</li>
          </ul>
        
          <ul className='container__items'>
            <li className='li__item'>- {t("studio.features.sound")}</li>
            <li className='li__item'>- {t("studio.features.dancebar")}</li>
            <li className='li__item'>- {t("studio.features.non-slip")}</li>
            <li className='li__item'>- {t("studio.features.furniture")}</li>
            <li className='li__item'>- {t("studio.features.atmosphere")}</li>
          </ul>
        </div>

        <div className="container__precio">
          <p className="rent__precio">25.000 €</p>
        </div>
      </div>
    </div>
  )
}

export default PageRent
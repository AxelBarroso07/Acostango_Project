import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageRent.css'

function PageRent() {

  return (
    <div>
    <NavBar/>
      <div className='container__rent'>
        <h1 className="rent__title">RENT THE STUDIO</h1>
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
            <li className='li__item'>- 30m² (6 meters wide, 5 meters long)</li>
            <li className='li__item'>- Specialized dance floor</li>
            <li className='li__item'>- Wall with full length mirror covering one side wide</li>
            <li className='li__item'>- Efficient ventilation system to keep a fresh environment</li>
            <li className='li__item'>- Soundproof walls for privacy and reduction of external noise</li>
          </ul>
        
          <ul className='container__items'>
            <li className='li__item'>- High quality sound system with Bluetooth connection</li>
            <li className='li__item'>- Fixed or mobile dance bar according to needs</li>
            <li className='li__item'>- Non-slip and safe floor for different dance styles</li>
            <li className='li__item'>- Versatile and easily configurable furniture for different activities</li>
            <li className='li__item'>- Ambient lighting system to create different atmospheres</li>
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
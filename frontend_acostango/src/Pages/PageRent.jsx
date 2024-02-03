import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageRent.css'

function PageRent() {
  return (
    <div className="container__rent">
      <NavBar/>
      <h1 className="rent__title">RENT THE STUDIO</h1>
      <div className="container__slider-images">
        <img src="" alt="img__studio-1" />
        <img src="" alt="img__studio-2" />
        <img src="" alt="img__studio-3" />
        <img src="" alt="img__studio-4" />
      </div>

      <div className="container__description-studio">
        <ul className='container__items-1'>
          <li className='li__item'>30m² (6 metros de ancho, 5 metros de largo) </li>
          <li className='li__item'>Piso especializado para baile</li>
          <li className='li__item'>Pared con espejo de cuerpo entero que cubre uno de los lados de ancho</li>
          <li className='li__item'>Sistema de ventilación eficiente para mantener un ambiente fresco</li>
          <li className='li__item'>Paredes insonorizadas para privacidad y reducción de ruido externo</li>
        </ul>

        <ul className='container__items-2'>
          <li className='li__item'>Sistema de sonido de alta calidad con conectividad Bluetooth</li>
          <li className='li__item'>Barra de baile fija o móvil según las necesidades</li>
          <li className='li__item'>Suelo antideslizante y seguro para diferentes estilos de baile</li>
          <li className='li__item'>Mobiliario versátil y fácilmente configurable para distintas actividades</li>
          <li className='li__item'>Sistema de iluminación ambiental para crear diferentes atmósferas</li>
        </ul>
      </div>
    </div>
  )
}

export default PageRent
import React from 'react'
import NavBar from '../components/NavBar/NavBar'
import '../Pages/PageMilonga.css'

function PageMilonga() {
  return (
    <div>
      <NavBar/>
      <div className='container__milonga'>
        <div className="container__image-milonga">
          <img src="../src/assets/image/page-milonga.jpg" alt="img-classes" className='image__milonga' />
        </div>
        <h1 className="milonga__title-3">AFTERWORK MILONGA</h1>
        <div className="container__info-3">
          <div className="container__block-3">
              <p className="description__block-3">Después de una jornada laboral agotadora, desconecta al ritmo de la música en nuestra milonga. Baila al salir del trabajo y recarga energías para el día siguiente. Ven a disfrutar y relajarte, luego descansa temprano y empieza el día siguiente con renovada vitalidad.</p>
              <div className="horario__block-3">
                <table className='table__block-3'>
                  <tr className='tr-3'>LUNES: 19:00 A 22:00 <span className='precio-3'>10 €</span></tr>
                </table>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PageMilonga
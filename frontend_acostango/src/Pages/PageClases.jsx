import React from 'react'
import '../Pages/PageClases.css'
import NavBar from '../components/NavBar/NavBar'

function PageClases() {
  return (  
    <div>
      <NavBar/>
      <div className='container__clases'>
        <div className="container__image-clases">
          <img src="../src/assets/image/image-classes.png" alt="img-classes" className='image__classes' />
        </div>
        <h1 className="classes__title">CLASSES</h1>
        <div className="container__info">
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
        </div>
      </div>
    </div>
  )
}

export default PageClases
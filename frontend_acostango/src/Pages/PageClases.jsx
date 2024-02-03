import React from 'react'
import '../Pages/PageClases.css'
import NavBar from '../components/NavBar/NavBar'

function PageClases() {
  return (  
    <div className="container__clases">
      <NavBar/>
      <div className="container__image-clases">
        <img src="#" alt="img-classes" />
      </div>
      <h1 className="clases__title">CLASSES</h1>
      <div className="container__info">
        <div className="container__begginers">
            <h2 className="title__begginers">Begginers</h2>
            <p className="description__begginers">Estas clases están orientadas para personas que ya tiene experiencia en el baile del tango. 
              Es necesario venir en pareja para tomar las clases de avanzados. En esta clase se manejan conceptos técnicos y movimientos complejos de Tango. Te esperamos!!!
            </p>
            <div className="horario__begginers">
              <table>
                <p>Miércoles: 18:00 a 19:00 <span className='precio'>15 €</span></p>
                <p>Viernes: 19:00 a 21:00 <span className='precio'>25 €</span></p>
                <p>Estudiantes <span className='precio'>15 €</span></p>
                <p>Block de 10 clases <span className='precio'>180 €</span></p>
              </table>
            </div>
        </div>
        <div className="containter__int-adv">
          <h2 className="title__int-adv">Intermediate & Advanced</h2>
          <p className="description__int-adv">Estas clases están orientadas para personas que ya tiene experiencia en el baile del tango. Es necesario venir en pareja para tomar 
            las clases de avanzados. En esta clase se manejan conceptos técnicos y movimientos complejos de Tango. Te esperamos!!!
          </p>
          <div className="horario__int-adv">
              <table>
                <p>Miércoles: 18:00 a 19:00 <span className='precio'>15 €</span></p>
                <p>Viernes: 19:00 a 21:00 <span className='precio'>25 €</span></p>
                <p>Estudiantes <span className='precio'>15 €</span></p>
                <p>Block de 10 clases <span className='precio'>180 €</span></p>
              </table>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PageClases
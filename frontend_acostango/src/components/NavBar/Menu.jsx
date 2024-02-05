import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const LeftMenu = styled.menu`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 600px;
  gap:60px;
  padding: 20px;
  background-color: #FFFF;
  box-shadow: rgba(0, 0, 0, 0.20) 50px 10px 40px 10px;
  position:fixed;
  top: 0;
  left:-650px;
  transform: ${({open}) => open ? 'translateX(102%)' : 'translateX(-100%)'};
  transition:1s;


  .menu__social-media{
    display: flex;
    justify-content: space-around;
    width:100%;
  }

  .menu__footer{
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    padding-top:20px;
  }

  .menu__disclaimer{
    font-family: 'Nunito',sans-serif;
    font-weight: 700;
    font-size: 1.3em;
    padding-bottom: 10px;
  }

  .menu__faq{
    display: flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
  }
  
  .faq__title{
    text-align: center;
    padding-bottom: 10px;
    font-family: "Roboto", sans-serif;
    font-size: 2.2em;
    font-weight: 400;
  }
  
  .details__answer{
    font-family: "Nunito", sans-serif;
    font-weight: 600;
    max-height: 100px;
    overflow-y: scroll;
    overflow-x: hidden;
    padding-bottom:2px;
    cursor:pointer;
    width: 400px;
  }

  .details__answer::-webkit-scrollbar{
    width:10px;
  }
  
  .details__question{
    width: 95%;
    max-width: 420px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    list-style: none;
    font-size: .9em;
    font-weight: bold;
    font-family: 'Roboto', sans-serif;
    margin: auto;
  }

  .container_clases{
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    width: 500px;
    padding-top:60px;
    padding-bottom:20px;
  }

  .clases{
    display: flex;
    flex-direction: column;
    justify-content: end;
    width: 200px;
    height: 200px;
    padding: 10px;
    background-color: #000;
  }

  .clases__title{
    text-align: center;
    color: #FFF;
    font-size: 1.2em;
    font-family: 'Nunito', sans-serif;
    font-weight:300;
  }

  .a__links-clases{
    text-decoration:none;
  }
   
  @media (max-width:800px){
    display: flex;
    justify-content: center;
    gap:20px;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    height: 100vh;
    width: 100%;
    background-color: #FFFF;
    box-shadow: rgba(0, 0, 0, 0.20) 50px 10px 40px 10px;
    position:absolute;
    top: 0;
    left:-100%;
    transform: ${({open}) => open ? 'translateX(100%)' : 'translateX(-100%)'};
    transition:0.3s;

    .menu__social-media{
      display: flex;
      justify-content: space-around;
      width:100%;
    }

    .menu__footer{
      display: flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
    }

    .menu__disclaimer{
      font-family: 'Nunito',sans-serif;
      font-weight: 700;
      font-size: 1em;
      padding-bottom: 10px;
    }

    .menu__faq{
      display: flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;
    }
    
    .faq__title{
      text-align: center;
      padding-bottom: 10px;
      font-family: "Roboto", sans-serif;
      font-size: 1.8em;
      font-weight: 400;
    }
    
    .details__answer{
      font-family: "Nunito", sans-serif;
      font-weight: 600;
      width: 300px;
    }
    
    .details__question{
      max-width: 300px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 25px;
      list-style: none;
      font-size: .8em;
      font-weight: bold;
      font-family: 'Roboto', sans-serif;
      margin-bottom: 2px;
    }

    .container_clases{
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
      width: 300px;
    }

    .clases{
      display: flex;
      flex-direction: column;
      justify-content: end;
      width: 120px;
      height: 120px;
      padding: 10px;
      background-color: #000;
    }

    .clases__title{
      text-align: center;
      color: #FFF;
      font-size: 1.2em;
      font-family: 'Nunito', sans-serif;
    }
  }
}
`
const Menu = ({open}) => {
  return (
    <LeftMenu open={open}>
      <div className="menu">
        <div className='container_clases'>
          <Link to='/clases' className='a__links-clases'>
            <div className="clases">
                <h1 className="clases__title">Classes</h1>
            </div>
          </Link>

          <Link to='/milonga' className='a__links-clases'>
            <div className="clases">
                <h1 className="clases__title">Milonga</h1>
            </div>
          </Link>

          <Link to='/events' className='a__links-clases'>
            <div className="clases">
                <h1 className="clases__title">Events</h1>
            </div>
          </Link>

          <Link to='/rent' className='a__links-clases'>
            <div className="clases">
                <h1 className="clases__title">Rent Studio</h1>
            </div>
          </Link>
      </div>

      <div className="menu__faq">
        <h1 className='faq__title'>FAQ</h1>
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>¿QUÉ ES EL TANGO?<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          El tango es una danza de pareja enlazada estrechamente surgida a partir de la fusión de danzas y ritmos afro-rioplatenses,gauchos, latinoamericanos y europeos. Es un baile característico de la región del Río de la Plata y su zona de influencia , principalmente en la ciudad de Buenos Aires, que se extendió por todo el mundo. Se caracteriza por el abrazo estrecho de la pareja, la caminata tanguera, el corte y la quebrada, y la improvisación.

        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>¿COMÓ SON LAS CLASES?<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          Las clases de Tango consta de diferentes partes: para los principiantes comenzamos con caminata para adquirir la "actitud" propia del este estilo y ritmo. Seguimos con ejercicios de técnica y luego trabajamos con movimientos, de manera de practicarlo con sus características propias. Estas clases van variando segun los distintos estilos pero siempre maneniendo la misma técnica. Conoce este maravilloso mundo del Tango!. Te esperamos!!
        </details>

        <details name="cookies" className='details__answer'>
          <summary className='details__question'>¿COMÓ EMPEZAR Y EN QUÉ MOMENTO DEL AÑO?<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          Comienza con las clases de principiantes, no es necesario tener ningún conocimiento previo. Podes empezar en cualquier época del año.
        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>¿CON QUE ROPA Y CALZADO HAY QUE ASISTIR?<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          Siempre es mejor bailar cómodo, así que la ropa es la que prefieras. En cuanto al calzado, si no tenés zapatos de baile podés traer algo que no se adherente mucho al piso, para no lastimar tus rodillas. Para empezar, algo con suela o goma dura (no adherente) en la base es lo mejor
        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>¿HACE FALTA IR EN PAREJA?<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          No, no hace falta venir en pareja. La mayoría de la gente viene sola, pero también podes venir en pareja. En estas clase generalmente hacemos siempre un cambio de pareja para que todos puedan bailar, pero también puedes bailar solo con tu pareja. Si son clases de avanzados o seminarios te sugerimos que vengas en pareja.
        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>¿HAY QUE INSCRIBIRSE ANTES?<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          No hace falta inscribirse, pero te recomendamos hacerlo, te presentas al horario que figura en la clase a la que quieres asistir. Se abona al final de la clase, podes elegir abonar una clase o tomar el bloque de 10 clases.
        </details>
      </div>

        <div className="menu__footer">
          <p className="menu__disclaimer">Siganos en nuestras redes sociales!</p>
          <div className="menu__social-media">
            <a className='a__link' href="#" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" className="icon-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg></a>
            <a className='a__link' href="#" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" className="icon-instagram" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg></a>
            <a className='a__link' href="#" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" className="icon-youtube" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" /><path d="M10 9l5 3l-5 3z" /></svg></a>
          </div>
        </div>
      </div>
    </LeftMenu>
  )
}

export default Menu
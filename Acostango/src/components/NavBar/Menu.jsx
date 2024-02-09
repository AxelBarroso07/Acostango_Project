import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import i18n from '../../Translation/i18n.js';
import { useTranslation } from 'react-i18next';

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

  .classes{
    background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(../src/assets/image/classes.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .milonga{
    background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(../src/assets/image/milonga.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .events{
    background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(../src/assets/image/events.jpg)  ;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
  }

  .rent{
    background-image:linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(../src/assets/image/rent.jpg)  ;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
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
    text-transform:uppercase;
    color:#000;
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
      padding-top: 20px;
      width: 100%;
    }

    .menu__disclaimer{
      font-family: 'Nunito',sans-serif;
      font-weight: 700;
      font-size: .8em;
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
      width: 100%;
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
      font-size: .65em;
      font-weigth: 700;
      font-family: 'Nunito', sans-serif;
      text-transform: uppercase;   
    }
  }
}
`

const Menu = ({open}) => {
  const { t } = useTranslation('translation');

  return (
    <LeftMenu open={open}>
      <div className="menu">
        <div className='container_clases'>
          <Link to='/classes' className='a__links-clases'>
            <div className="clases classes">
                <h1 className="clases__title">{t("menu.boxes.classes")}</h1>
            </div>
          </Link>

          <Link to='/milonga' className='a__links-clases'>
            <div className="clases milonga">
                <h1 className="clases__title">{t("menu.boxes.milonga")}</h1>
            </div>
          </Link>

          <Link to='/events' className='a__links-clases'>
            <div className="clases events">
                <h1 className="clases__title">{t("menu.boxes.events")}</h1>
            </div>
          </Link>

          <Link to='/rent' className='a__links-clases'>
            <div className="clases rent">
                <h1 className="clases__title">{t("menu.boxes.rent-studio")}</h1>
            </div>
          </Link>
      </div>

      <div className="menu__faq">
        <h1 className='faq__title'>FAQ</h1>
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>{t("menu.questions.question1.question")}<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          {t("menu.questions.question1.answer")}
        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>{t("menu.questions.question2.question")}<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          {t("menu.questions.question2.answer")}
        </details>

        <details name="cookies" className='details__answer'>
          <summary className='details__question'>{t("menu.questions.question3.question")}<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          {t("menu.questions.question3.answer")}
        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>{t("menu.questions.question4.question")}<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          {t("menu.questions.question4.answer")}
        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>{t("menu.questions.question5.question")}<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          {t("menu.questions.question5.answer")}
        </details>
        
        <details name="cookies" className='details__answer'>
          <summary className='details__question'>{t("menu.questions.question6.question")}<svg xmlns="http://www.w3.org/2000/svg" className="arrow_dropdown" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg></summary>
          {t("menu.questions.question6.answer")}
        </details>
      </div>

        <div className="menu__footer">
          <p className="menu__disclaimer">{t("menu.subtitle")}</p>
          <div className="menu__social-media">
            <a className='a__link' href="https://www.facebook.com/profile.php?id=100095562006697" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" className="icon-facebook" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 10v4h3v7h4v-7h3l1 -4h-4v-2a1 1 0 0 1 1 -1h3v-4h-3a5 5 0 0 0 -5 5v2h-3" /></svg></a>
            
            {/*
              <a className='a__link' href="#" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" className="icon-instagram" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M16.5 7.5l0 .01" /></svg></a>
            */}

            <a className='a__link' href="https://youtube.com/@MartinyVictoria?si=jt_rrGGhQpoLJSVy" target='_blank'><svg xmlns="http://www.w3.org/2000/svg" className="icon-youtube" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M2 8a4 4 0 0 1 4 -4h12a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-12a4 4 0 0 1 -4 -4v-8z" /><path d="M10 9l5 3l-5 3z" /></svg></a>
          </div>
        </div>
      </div>
    </LeftMenu>
  )
}

export default Menu
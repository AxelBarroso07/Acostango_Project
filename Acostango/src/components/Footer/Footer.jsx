import React, { useEffect, useState } from 'react';
import '../Footer/Footer.css'
import i18n from '../../Translation/i18n.js';
import { useTranslation } from 'react-i18next';


function Footer() {

  const { t } = useTranslation('translation');

  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    let lastScrollPosition = window.scrollY;

    const handleScroll = () => {
      const currentScrollPosition = window.scrollY;

      const scrollingUp = currentScrollPosition < lastScrollPosition;

      setIsHidden(scrollingUp);

      lastScrollPosition = currentScrollPosition;
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <footer className="footer">
        <a className='footer__link' href="#" target='_blank'><p className="footer__description">{t("rights")}<svg className='icon-polaris' id="Capa_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 667.99 168"><path className="cls-1" d="M40.8,168H0L25.2,48.4H57.8l3.6,12.8h1.2c4.8-5.07,10.17-8.7,16.1-10.9,5.93-2.2,11.77-3.3,17.5-3.3,4.67,0,8.57,.7,11.7,2.1,3.13,1.4,5.63,3.3,7.5,5.7,1.87,2.4,3.2,5.27,4,8.6,.8,3.33,1.2,6.87,1.2,10.6,0,1.87-.13,4.67-.4,8.4-.27,3.73-.87,7.9-1.8,12.5-.93,4.6-2.27,9.33-4,14.2-1.73,4.87-4.03,9.3-6.9,13.3-2.87,4-6.47,7.27-10.8,9.8-4.33,2.53-9.5,3.8-15.5,3.8-3.33,0-6.57-.4-9.7-1.2-3.13-.8-5.97-1.87-8.5-3.2-2.53-1.33-4.77-2.9-6.7-4.7-1.93-1.8-3.37-3.63-4.3-5.5h-1.2l-10,46.6Zm21.2-51.4c3.2,0,5.87-1.7,8-5.1,2.13-3.4,3.87-7.4,5.2-12,1.33-4.6,2.3-9.2,2.9-13.8,.6-4.6,.9-8.03,.9-10.3,0-2.67-.43-4.87-1.3-6.6-.87-1.73-2.43-2.6-4.7-2.6-2.53,0-4.93,.9-7.2,2.7-2.27,1.8-3.93,3.37-5,4.7l-7.8,36.6c1.07,1.47,2.33,2.9,3.8,4.3,1.47,1.4,3.2,2.1,5.2,2.1Z"/><path className="cls-1" d="M194.4,46.2c15.87,0,27.4,2.8,34.6,8.4,7.6,5.87,11.4,15.6,11.4,29.2,0,8.4-1.4,15.97-4.2,22.7-2.8,6.73-6.73,12.3-11.8,16.7-10.13,8.54-24.8,12.8-44,12.8-16.4,0-28.13-3.13-35.2-9.4-7.6-6.53-11.4-16.33-11.4-29.4,0-8.67,1.77-16.53,5.3-23.6,3.53-7.07,8.63-12.93,15.3-17.6,9.73-6.53,23.07-9.8,40-9.8Zm-13.6,76.2c3.33,0,6.23-1.87,8.7-5.6,2.47-3.73,4.43-8.3,5.9-13.7,1.47-5.4,2.57-11,3.3-16.8,.73-5.8,1.1-10.83,1.1-15.1,0-3.73-.37-6.57-1.1-8.5-.73-1.93-2.3-2.9-4.7-2.9-3.6,0-6.7,1.93-9.3,5.8-2.6,3.87-4.7,8.47-6.3,13.8-1.6,5.33-2.77,10.8-3.5,16.4-.73,5.6-1.1,10.13-1.1,13.6,0,8.67,2.33,13,7,13Z"/><path className="cls-1" d="M290.6,134.4h-40.8L278.2,0h41l-28.6,134.4Z"/><path className="cls-1" d="M324.8,55.8c6.8-3.33,13.77-5.77,20.9-7.3,7.13-1.53,15.1-2.3,23.9-2.3s15.6,.67,21.2,2c5.6,1.33,10.06,3.27,13.4,5.8,3.33,2.53,5.67,5.53,7,9,1.33,3.47,2,7.4,2,11.8,0,2.53-.17,5.27-.5,8.2-.33,2.93-.7,5.4-1.1,7.4l-9.4,44h-32.2l-3.6-12.8h-1.2c-4.27,4.67-9.23,8.23-14.9,10.7-5.67,2.47-11.3,3.7-16.9,3.7-3.2,0-6.33-.47-9.4-1.4-3.07-.93-5.8-2.37-8.2-4.3-2.4-1.93-4.33-4.4-5.8-7.4-1.46-3-2.2-6.63-2.2-10.9,0-6.93,1.9-12.43,5.7-16.5,3.8-4.07,8.8-7.13,15-9.2,6.2-2.07,13.2-3.37,21-3.9,7.8-.53,15.63-.8,23.5-.8,.27-1.33,.6-3.23,1-5.7,.4-2.47,.6-4.63,.6-6.5,0-2.4-.63-4.63-1.9-6.7-1.27-2.07-3.9-3.1-7.9-3.1-4.67,0-8.1,1.37-10.3,4.1-2.2,2.73-3.63,6.04-4.3,9.9h-29.2l3.8-17.8Zm46,35.2h-3.6c-3.87,0-7.17,.5-9.9,1.5-2.73,1-4.94,2.3-6.6,3.9-1.67,1.6-2.9,3.4-3.7,5.4s-1.2,4-1.2,6c0,3.2,.83,5.6,2.5,7.2,1.66,1.6,3.63,2.4,5.9,2.4,2.8,0,5.57-1,8.3-3,2.73-2,4.43-4.67,5.1-8l3.2-15.4Z"/><path className="cls-1" d="M437,48.4h32.6l3,15h1.4c3.06-4.8,7-8.87,11.8-12.2,4.8-3.33,11.13-5,19-5,.53,0,1.37,.04,2.5,.1,1.13,.07,2.4,.27,3.8,.6,1.4,.33,2.87,.8,4.4,1.4,1.53,.6,3.03,1.43,4.5,2.5l-8.8,41.2h-21.8c-.27-8.27-1-14.03-2.2-17.3-1.2-3.27-3.13-4.9-5.8-4.9-1.33,0-2.77,.3-4.3,.9-1.54,.6-3.1,1.9-4.7,3.9l-12.8,59.8h-40.8l18.2-86Z"/><path className="cls-1" d="M555.99,134.4h-40.6l18.2-86h41l-18.6,86Zm23.8-112.2c0,3.07-.63,5.73-1.9,8-1.27,2.27-2.94,4.2-5,5.8-2.07,1.6-4.44,2.8-7.1,3.6-2.67,.8-5.4,1.2-8.2,1.2-5.33,0-9.8-1.27-13.4-3.8-3.6-2.53-5.4-6.53-5.4-12,0-2.93,.6-5.57,1.8-7.9,1.2-2.33,2.83-4.27,4.9-5.8,2.07-1.53,4.46-2.7,7.2-3.5,2.73-.8,5.57-1.2,8.5-1.2,5.2,0,9.6,1.27,13.2,3.8,3.6,2.53,5.4,6.47,5.4,11.8Z"/><path className="cls-1" d="M637.39,73.6c.13-.67,.27-1.33,.4-2,.13-.67,.2-1.4,.2-2.2,0-2.4-.43-4.63-1.3-6.7-.87-2.07-2.57-3.1-5.1-3.1-2.27,0-4.53,.97-6.8,2.9-2.27,1.93-3.4,4.5-3.4,7.7,0,2.13,.57,3.83,1.7,5.1,1.13,1.27,2.63,2.3,4.5,3.1s3.97,1.47,6.3,2c2.33,.53,4.63,1.07,6.9,1.6,3.2,.8,6.23,1.77,9.1,2.9,2.87,1.13,5.43,2.63,7.7,4.5,2.27,1.87,4.07,4.17,5.4,6.9,1.33,2.73,2,6.1,2,10.1,0,5.6-1.3,10.3-3.9,14.1-2.6,3.8-6.2,6.87-10.8,9.2-4.6,2.33-10,3.97-16.2,4.9-6.2,.93-12.83,1.4-19.9,1.4-10.8,0-19.73-.8-26.8-2.4-7.07-1.6-12-3.13-14.8-4.6l4.2-20h27c-.13,.67-.2,1.3-.2,1.9v1.9c0,3.07,.7,5.5,2.1,7.3,1.4,1.8,3.83,2.7,7.3,2.7,3.87,0,6.63-1.1,8.3-3.3,1.67-2.2,2.5-4.23,2.5-6.1s-.7-3.5-2.1-4.9c-1.4-1.4-3.17-2.6-5.3-3.6-2.13-1-4.5-1.87-7.1-2.6-2.6-.73-5.1-1.43-7.5-2.1-1.73-.4-3.7-1.07-5.9-2-2.2-.93-4.3-2.27-6.3-4-2-1.73-3.67-3.96-5-6.7-1.33-2.73-2-6.17-2-10.3,0-5.87,1.43-10.77,4.3-14.7,2.87-3.93,6.6-7.1,11.2-9.5,4.6-2.4,9.8-4.13,15.6-5.2,5.8-1.07,11.63-1.6,17.5-1.6,7.33,0,14.27,.67,20.8,2,6.53,1.33,11.87,3.07,16,5.2l-4.6,20.2h-26Z"/></svg> 2024.</p></a>
    
      <div className={`contact__social-media ${ isHidden ? 'sticky' : ''}`}>
        <a className='a__link maps' href="https://maps.app.goo.gl/37D5iPg8QjRQRed7A" target='_blank'>{t("footer.links.maps")}<svg xmlns="http://www.w3.org/2000/svg" className="icon-map" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" /></svg></a>
        
        <a className='a__link wzp' href="https://wa.me/436503221098" target='_blank'>{t("footer.links.whatsapp")}<svg xmlns="http://www.w3.org/2000/svg" className="icon-whatsapp" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 21l1.65 -3.8a9 9 0 1 1 3.4 2.9l-5.05 .9" /><path d="M9 10a.5 .5 0 0 0 1 0v-1a.5 .5 0 0 0 -1 0v1a5 5 0 0 0 5 5h1a.5 .5 0 0 0 0 -1h-1a.5 .5 0 0 0 0 1" /></svg></a>
        
        <a className='a__link call' href="tel:+436503221098" target='_blank'>{t("footer.links.call")}<svg xmlns="http://www.w3.org/2000/svg" className="icon-phone" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg></a>
        
        <a className='a__link mail' href="#contact">{t("footer.links.email")}<svg xmlns="http://www.w3.org/2000/svg" className="icon-mail" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" /><path d="M3 7l9 6l9 -6" /></svg></a>
      </div>
    </footer>
  )
}

export default Footer
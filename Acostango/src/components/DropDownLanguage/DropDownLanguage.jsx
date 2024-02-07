import React from 'react'
import '../DropDownLanguage/DropDownLanguage.css'
import i18n from '../../Translation/i18n.js';

const DropDownLanguage = () => {

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className='dropDownLanguage'>
        <ul className=''>
          <button className='text__language' onClick={() => changeLanguage('en')}>EN</button>
          <button className='text__language' onClick={() => changeLanguage('ger')}>GER</button>
        </ul>
    </div>
  )
}

export default DropDownLanguage
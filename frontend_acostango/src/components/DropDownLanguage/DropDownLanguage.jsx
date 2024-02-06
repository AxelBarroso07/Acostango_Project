import React from 'react'
import '../DropDownLanguage/DropDownLanguage.css'

const DropDownLanguage = () => {
  return (
    <div className='dropDownLanguage'>
        <ul className=''>
            <button className='text__language'>EN</button>
            <button className='text__language'>GER</button>
        </ul>
    </div>
  )
}

export default DropDownLanguage
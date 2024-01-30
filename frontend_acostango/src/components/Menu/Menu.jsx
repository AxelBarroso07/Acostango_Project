import React from 'react'
import '../Menu/Menu.css'
import MenuClases from '../MenuClases/MenuClases' 
import MenuFaq from '../MenuFaq/MenuFaq'
import MenuFooter from '../MenuFooter/MenuFooter'

function Menu() {
  return (
    <nav className="menu">
        <button className='button' id=''><svg xmlns="http://www.w3.org/2000/svg" className="icon-x" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg></button>
        <MenuClases />
        <MenuFaq />
        <MenuFooter />
    </nav>
  )
}

export default Menu
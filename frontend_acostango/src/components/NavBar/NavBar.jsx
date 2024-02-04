import React from 'react'
import styled from 'styled-components'
import MenuButton from './MenuButton'
import ButtonLanguage from '../ButtonLanguage/ButtonLanguage'

const Nav = styled.nav`
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  width: 100%;
  background-color: #FFFFFF;
  position:fixed;
  z-index: 999;

  .logo{
    width:50%;
    height:100%;
  }

  .header__logo{
    width:100%;
    height:100%;
  }
`

const NavBar = () => {
  return (
    <Nav>
      <MenuButton />
      <div className="logo"><a href="/"><img src="../src/assets/icons/ACOSTANGO.svg" alt="acostango_logo" className='header__logo'/></a></div>
      <ButtonLanguage />
    </Nav>
  )
}
  
export default NavBar
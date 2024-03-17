import React from 'react'
import styled from 'styled-components'
import MenuButton from './MenuButton'
import ButtonLanguage from '../ButtonLanguage/ButtonLanguage'
import LogoAcostango from '../../assets/image/logo-acostango-1.svg'

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

  @media (max-width: 960px){
    padding: 10px 25px;
  }

  .logo{
    width:auto;
    height:auto;
  }

  .header__logo{
    width: 300px;
    height:60px;
  }

  @media (max-width: 500px){
    .header__logo{
      width: 200px;
      height:40px;
    }
  }
`

const NavBar = () => {
  return (
    <Nav>
      <MenuButton />
      <div className="logo"><a href="/"><img src={LogoAcostango} alt="acostango_logo" className='header__logo'/></a></div>
      <ButtonLanguage />
    </Nav>
  )
}
  
export default NavBar
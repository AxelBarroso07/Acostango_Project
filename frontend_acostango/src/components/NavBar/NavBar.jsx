import React from 'react'
import styled from 'styled-components'
import MenuButton from './MenuButton'
import ButtonLanguage from '../ButtonLanguage/ButtonLanguage'

const Nav = styled.nav`
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: #FFFFFF;
`

const NavBar = () => {
  return (
    <Nav>
      <MenuButton />
      <div className="logo"><a href=""><img src="#" alt="acostango_logo" /></a></div>
      <ButtonLanguage/>
    </Nav>
  )
}
  
export default NavBar
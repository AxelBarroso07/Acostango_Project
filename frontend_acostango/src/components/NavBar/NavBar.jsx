import React from 'react'
import styled from 'styled-components'
import MenuButton from './MenuButton'

const Nav = styled.nav`
  height: 150px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background-color: #FFFFFF;

  .button{
    border: none;
    background-color: #FFFFFF;
    width: 40px;
    height: 40px;
  }

  .button:hover{
    cursor: pointer;
  }

  .header__icon{
    width: 100%;
    height: 100%;
    stroke-width:1.5;
  }
`

const NavBar = () => {
  return (
    <Nav>
      <MenuButton />
      <div className="logo"><a href=""><img src="#" alt="acostango_logo" /></a></div>
      <button className="button"><svg xmlns="http://www.w3.org/2000/svg" className="header__icon" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M3.6 9h16.8" /><path d="M3.6 15h16.8" /><path d="M11.5 3a17 17 0 0 0 0 18" /><path d="M12.5 3a17 17 0 0 1 0 18" /></svg></button>
    </Nav>
  )
}
  
export default NavBar
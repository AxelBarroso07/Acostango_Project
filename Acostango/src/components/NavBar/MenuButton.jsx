import React, {useState} from 'react'
import styled from 'styled-components'
import Menu from './Menu'

const Burger = styled.div`
  width:32px;
  height:32px;
  top:15px;
  left:20px;
  display:flex;
  justify-content:space-around;
  flex-flow:column nowrap;
  z-index:20;

  @media (max-width: 500px){
    width:42x;
    height:30px;
  }
  
  div{ 
    width:2rem;
    height:0.25rem;
    background-color:${({open}) => open ? '#4d4d4d' : '#000'};
    border-radius:10px;
    cursor:pointer;
    transform-origin:1px;
    transition: all 0.3s linear;

    &:nth-child(1){
      transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2){
      transform: ${({open}) => open ? 'translateX(-100%)' : 'translateX(0)'};
      opacity:${({open}) => open ? 0 : 1};
    }

    &:nth-child(3){
      transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }


    @media (max-width: 500px){

      &:nth-child(1){
        transform: ${({open}) => open ? 'rotate(45deg)' : 'rotate(0)'};
        width:30px;
      }
  
      &:nth-child(2){
        transform: ${({open}) => open ? 'translateX(-100%)' : 'translateX(0)'};
        opacity:${({open}) => open ? 0 : 1};
        width:30px;
      }
  
      &:nth-child(3){
        transform: ${({open}) => open ? 'rotate(-45deg)' : 'rotate(0)'};
        width:30px;
      }

      width:25px;
      height:3px;
    }
  }
`

const MenuButton = () => {

  const [open, setOpen] = useState(false)

  return (
    <>
      <Burger open={open} onClick={() => setOpen(!open)}>
        <div></div>
        <div></div>
        <div></div>
      </Burger>

      <Menu open={open}/>
    </>
  )
}

export default MenuButton

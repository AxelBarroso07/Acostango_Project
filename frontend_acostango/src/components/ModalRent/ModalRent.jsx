import React from 'react'
import Slider from '../Slider/Slider'
import styled from 'styled-components'

const ModalRent = () => {
  return (
    <div className='container__modal'>
        <Overlay>
            <ContenedorModal>
                <Slider />
            </ContenedorModal>
        </Overlay>
    </div>
  )
}

export default ModalRent

const Overlay = styled.div`
    width:100vw;
    height:100vh;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,.5);
`;

const ContenedorModal = styled.div`
    width:500px;
    min-heigth:100px;
    background-color:#FFF;
    position:relative;
`;
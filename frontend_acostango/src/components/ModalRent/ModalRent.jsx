import React from 'react';
import styled from 'styled-components';

const ModalRent = ({ estado, cambiarEstado }) => {
  const handleCloseModal = () => {
    cambiarEstado(false);
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className='container__modal'>
      {estado && (
        <Overlay onClick={() => cambiarEstado(false)}>
          <ContenedorModal onClick={handleModalClick}>
            <BotonCerrar onClick={handleCloseModal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon-x"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </BotonCerrar>
          </ContenedorModal>
        </Overlay>
      )}
    </div>
  );
};

export default ModalRent;

const Overlay = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const ContenedorModal = styled.div`
  width: 80%;
  height: 80%;
  background-color: #fff;
  position: relative;
  border-radius: 5px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 20px;
  margin-top: 80px;
`;

const BotonCerrar = styled.button`
  position: absolute;
  z-index: 999;
  top: 20px;
  left: 20px;
  color: #000;
  border: none;
  background: none;
  cursor: pointer;
  width: 30px;
  height: 30px;
  transition: 0.3s ease all;
  border-radius: 5px;

  &:hover {
    background: #f2f2f2;
  }

  svg {
    width: 100%;
    height: 100%;
  }
`;

import React from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
 display:flex;
 flex-direction: column;
 gap: 1rem;
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.625rem;
  width: 87.2%;
  max-width: 400px;
`;

const MobileButtons = ({
  isOpen,
  onClose,
  restartGame,
  startNewGame,
  resumeGame,
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
      <CustomButton text="Restart" backgroundColor="--color-orange" textColor="--color-background-page"  BackgroundColorHover="--color-orange-hover" onClick={restartGame} />
         
          <CustomButton text="New Game" backgroundColor="--color-boxes" textColor="--color-menu-active" hoverColor="--color-menu-hover" onClick={startNewGame} />
          <CustomButton text="Resume Game" backgroundColor="--color-boxes" textColor="--color-menu-active" hoverColor="--color-menu-hover" onClick={resumeGame} />
            
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MobileButtons;

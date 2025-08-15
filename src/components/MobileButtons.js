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
  restartGame,
  startNewGame,
  resumeGame,
}) => {
  return (
    <ModalOverlay>
      <ModalContainer>
      <CustomButton $text="Restart" $backgroundColor="var(--color-orange)" $textColor="var(--color-background-page)" $textcolorhover="var(--color-background-page)" $backgroundColorHover="var(--color-orange-hover)" onClick={restartGame} />
         
          <CustomButton $text="New Game" bgcolor="--color-boxes" textcolor="--color-menu-active" hovercolor="--color-menu-hover" onClick={startNewGame} />
          <CustomButton $text="Resume Game" bgcolor="--color-boxes" textcolor="--color-menu-active" hovercolor="--color-menu-hover" onClick={resumeGame} />
            
      </ModalContainer>
    </ModalOverlay>
  );
};

export default MobileButtons;

import React from 'react';
import styled from 'styled-components';
import CustomButton from './CustomButton';
import { formatTime } from './GamePage';

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
  background-color: white;
  padding: 1.25rem;
  margin: auto 1.5rem;
  border-radius: 0.625rem;
  max-width: 40.875rem;
  width: 100%;
  background-color: var(--color-background-page);
  @media (min-width: 768px) {
    
    padding: 3.1875rem 3.5rem;

    }
`;

const PopupContainer = styled.div`
  /* padding: 20px; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PopUpInfoSoloContainer= styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
width: 100%;
@media (min-width: 768px) {
    gap: 1rem;

    }
`

const PopUpInfoContainer = styled.div`
display: flex;
flex-direction: column;
gap: 0.5rem;
width: 100%;
@media (min-width: 768px) {
    gap: 1rem;
    margin-bottom: 1rem;
    }
`

const PopupMessage = styled.h1`
  color: var(--color-background);
  margin-bottom: 0.5625rem;
  @media (min-width: 768px) {
    margin-bottom: 1rem;

    }
`;

const PopupSubMessage = styled.div`
  font-size: 0.875rem;
  color: var(--color-text);
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    
    font-size: 1.125rem;
    margin-bottom: 2.5rem;
    }
  
`;

const PopupInfo = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
height: 3rem;
  font-size: 1rem;
  
  background-color: ${(props) =>
    props.isWinner ? 'var(--color-background)' : 'var(--color-boxes)'};
  width: 100%;
  padding: 0 1rem;
  border-radius: 5px;
  @media (min-width: 768px) {
    
   height: 4.5rem;
   padding: 0 2rem;
    }
`

const PopUpInfoText = styled.p`
font-size: 0.8125rem;
color: var(--color-text);
color: ${(props) =>
    props.isWinner ? 'var(--color-background-page)' : 'var(--color-text)'};
     @media (min-width: 768px) {
    
    font-size: 1.125rem;
     }
`

const PopUpInfoValue = styled.h4`
font-size: 1.25rem;
color: ${(props) =>
    props.isWinner ? 'var(--color-background-page)' : 'var(--color-menu-active)'};
       @media (min-width: 768px) {
    
    font-size: 2rem;
     }
`

const PopupPlayerScore = styled.div`
  display: flex;
  align-items: center;
  margin: 5px 0;
  
  
`;


const ButtonContainer = styled.div`
display: flex;
flex-direction: column;
width: 100%;
gap: 1rem;
margin-top: 1.5rem;
@media (min-width: 768px) {
    
    flex-direction: row;
    margin-top: 2.5rem;
     }
`

const Popup = ({
  isSinglePlayer,
  winners,
  playersInfo,
  time,
  moves,
  restartGame,
  startNewGame,
  setShowPopup,
  totalTime,
}) => {
  // Initialize with the value of showPopup
  return (
    <ModalOverlay>
      <ModalContainer>
        <PopupContainer>
          {isSinglePlayer ? (
            <>
              <PopupMessage><h1>You did it!</h1></PopupMessage>
              <PopupSubMessage>
                Game Over! Here's how you got on...
              </PopupSubMessage>
              <PopUpInfoSoloContainer>
              <PopupInfo>
              <PopUpInfoText>Time Elapsed</PopUpInfoText>
              <PopUpInfoValue>{formatTime(totalTime)}</PopUpInfoValue>
              </PopupInfo>
              <PopupInfo>
              <PopUpInfoText>Moves Taken </PopUpInfoText>
              <PopUpInfoValue>{moves} Moves</PopUpInfoValue>
              </PopupInfo>
              </PopUpInfoSoloContainer>
            </>
          ) : (
            <>
              <PopupMessage>
                {winners.length === 1
                  ? `Player ${winners[0]} Wins!`
                  : "It's a tie!"}
              </PopupMessage>
              <PopupSubMessage>
              Game Over! Here are the results...
            </PopupSubMessage>
            <PopUpInfoContainer>
              {playersInfo
                .sort((a, b) => b.score - a.score)
                .map((player) => (
                 
                  <PopupInfo isWinner={winners.includes(player.id)} key={player.id}>
                  <PopupPlayerScore key={player.id}>
                    <PopUpInfoText isWinner={winners.includes(player.id)}>
                      {player.name}     {winners.includes(player.id) && (
                        `(Winner!)`
                      )}
                     
                    </PopUpInfoText>
                  
                 
                  </PopupPlayerScore>
                  <PopUpInfoValue isWinner={winners.includes(player.id)}>
                  {player.score} Pairs
                </PopUpInfoValue>
                  </PopupInfo>
                 
                ))}
                </PopUpInfoContainer>
            </>
          )}
         <ButtonContainer>
          <CustomButton fontSize={{
            small: '1.125rem',
            large: '1.25rem',
            
           
          }} height={{
            small: '3rem',
            large: '3.25rem',
            
           
           
          }} text="Restart" backgroundColor="--color-orange" textColor="--color-background-page"  BackgroundColorHover="--color-orange-hover" onClick={restartGame} />
         
          <CustomButton fontSize={{
            small: '1.125rem',
            large: '1.25rem',
            
           
          }} height={{
            small: '3rem',
            large: '3.25rem',
            
           
           
          }} text="Setup New Game" backgroundColor="--color-boxes" textColor="--color-menu-active" onClick={startNewGame} />
         

          </ButtonContainer>
        </PopupContainer>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default Popup;

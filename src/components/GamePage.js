import { useState, useEffect, useCallback, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';
import MobileButtons from './MobileButtons';
import cardFlipsound from '../assets/cardflip.mp3';
import matchFoundSound from '../assets/matchfound.mp3';
import finishGameSound from '../assets/gamefinished.mp3';

import styled from 'styled-components';
import {
  faCloud,
  faUmbrella,
  faSnowflake,
  faSun,
  faWater,
  faWind,
  faVolcano,
  faTornado,
  faTemperatureArrowDown,
  faTemperatureArrowUp,
  faRainbow,
  faMeteor,
  faIcicles,
  faHurricane,
  faCloudRain,
  faCloudShowersHeavy,
  faBoltLightning,
  faCloudBolt,
} from '@fortawesome/free-solid-svg-icons';
import GameGrid from './GameGrid';
import Popup from './PopUp';
import CustomButton from './CustomButton';

const GamePageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-background-page);
  padding: 1.5rem;
  @media (min-width: 768px) {
    
    padding: 2.3125rem 2.4375rem;

    }
  @media (min-width: 1200px) {
    
    padding: 4.1875rem 10.3125rem;

    }
`;

const ButtonContainer = styled.div`
display: flex;
gap: 1.375rem;
`

const GamePageHeader = styled.div`
width: 100%;
display: flex;
justify-content: space-between;
align-items: center;
margin-bottom: 5rem;
max-width: 69.375rem;
@media (min-width: 768px) {
    
   margin-bottom: 7.5625rem;

    }
@media (min-width: 1200px) {
    
  margin-bottom: 5.3125rem;

    }
   


`

const LogoWrapper = styled.div`
  width: 5.75rem;
  display: flex;
  justify-content: center;
  align-content: center;
  @media (min-width: 768px) {
    
    width: 9.5625rem;
 
     }

  
`;

const ButtonWrapper = styled.div`
  width: 4.875rem;
`;

const SinglePlayerContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin-top: 6.375rem;
gap: 1.5625rem;
@media (min-width: 768px) {
width: 33.75rem;
gap: 1.875rem;
margin-top: 7.625rem;
    }
@media (min-width: 1200px) {
    
    margin-top: 6.625rem;
  
      }
`

const SinglePlayerScoreBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: 100%;
height: 4.375rem;
background-color: var(--color-boxes);
padding: 0.625rem;
border-radius: 0.3125rem;
@media (min-width: 768px) {
  flex-direction: row;
  justify-content: space-between;
  padding: 1.3125rem;
height: 4.5rem;
    }
`

const SinglePlayerData = styled.p`
color: var(--color-text);
margin-bottom: 0.5rem;
font-size: 0.9375rem;
@media (min-width: 768px) {
  font-size: 1.125rem;
  margin-bottom: 0;
    }

`

const SinglePlayerValue = styled.h3`
color: var(--color-menu-active);
font-size: 1.5rem; 
@media (min-width: 768px) {
  font-size: 2rem;
    }
`

const PlayersContainer = styled.div`
display: flex;
justify-content: space-between;
width: 100%;
margin-top: 6.375rem;
height: 4.375rem;
gap: 1.5rem;
max-width: 69.375rem;
@media (min-width: 768px) {
  height: 5rem;
  margin-top: 7.75rem
    }

`



const PlayerBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  border-radius: 5px;
  background-color: ${(props) =>
    props.$isCurrent ? `var(--color-orange)` : `var(--color-boxes)`}; // Use $ prefix
    @media (min-width: 768px) {
    align-items: flex-start;
    padding: 1rem;
    }

    @media (min-width: 1200px) {
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 padding: 1.3125rem;
    }
  
`

const TriangleIndicator = styled.div`
  position: absolute;
  top: -8px; /* Adjust this value to position the triangle correctly */
  left: 50%;
  transform: translateX(-50%);
  border-width: 0 0.5rem 0.5rem; /* Create the triangle shape */
  border-style: solid;
  border-color: transparent transparent var(--color-orange) transparent; /* Set the triangle color */
  @media (min-width: 768px) {
    top: -12px;
    border-width: 0 0.75rem 0.75rem; 
    }
`;

const MessageIndicator = styled.div`
display: none;
  @media (min-width: 1200px) {
    color: var(--color-background);
    display: flex;
    position: absolute;
  bottom: -23px; /* Adjust this value to position the triangle correctly */
  left: 50%;
  transform: translateX(-50%);
  text-align:left;
  font-size: 13px;
    }
`;



const PlayerName = styled.h3`
color: ${(props) =>
    props.$isCurrent ? `var(--color-background-page)` : `var(--color-text)`}; 
  margin-bottom: 0.3125rem;
  font-size: 0.9375rem;

  @media (min-width: 1200px) {
    font-size: 1.125rem; 
    margin-bottom: 0;
    }
  
`;

const PlayerScore = styled.p`
color: ${(props) =>
    props.$isCurrent ? `var(--color-background-page)` : `var(--color-menu-active)`}; 
  margin: 0;
  font-size: 1.5rem;
  @media (min-width: 1200px) {
    font-size: 2rem; 
    }
`;

export const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const themes = {
  Numbers: Array.from({ length: 18 }, (_, index) => index + 1),
  Icons: [
    faCloud,
    faUmbrella,
    faSnowflake,
    faSun,
    faWater,
    faWind,
    faVolcano,
    faTornado,
    faTemperatureArrowDown,
    faTemperatureArrowUp,
    faRainbow,
    faMeteor,
    faIcicles,
    faHurricane,
    faCloudRain,
    faCloudShowersHeavy,
    faBoltLightning,
    faCloudBolt,
  ],
};

const GamePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const breakpoint = 768;

  const [playersInfo, setPlayersInfo] = useState([
    { id: 1, name: 'Player 1', score: 0 },
    { id: 2, name: 'Player 2', score: 0 },
    { id: 3, name: 'Player 3', score: 0 },
    { id: 4, name: 'Player 4', score: 0 },
    // Add more players as needed
  ]);

  const [currentPlayer, setCurrentPlayer] = useState(1); // Initial current player
  const [timer, setTimer] = useState(0); // Time in seconds
  const [moves, setMoves] = useState(0); // Number of moves made
  const [isGameStarted, setIsGameStarted] = useState(false); // Flag to indicate if the game has started
  const [movesIncremented, setMovesIncremented] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highlightedMatches, setHighlightedMatches] = useState([]);

  const useAudio = (soundSource) => {
    const audio = useRef(new Audio(soundSource)).current;

    const play = useCallback(() => {
      audio.currentTime = 0;
      audio.play();
    }, [audio]);

    const pauseAndReset = useCallback(() => {
      audio.pause();
      audio.currentTime = 0;
    }, [audio]);

    return [play, pauseAndReset];
  };

  const [playFlipSound, resetFlipSound] = useAudio(cardFlipsound);
  const [playMatchSound, resetMatchSound] = useAudio(matchFoundSound);
  const [playGameFinishSound, resetGameFinishSound] = useAudio(finishGameSound);

  const theme = state.theme;
  const gridSize = state.gridSize;
  const players = state.players;

  const rows = gridSize === '4x4' ? 4 : 6;
  const columns = gridSize === '4x4' ? 4 : 6;
  const totalCards = rows * columns;

  const totalPairs = totalCards / 2;

  const shuffledContent = themes[theme]
    .slice(0, totalCards / 2) // Take half the total cards for the game
    .concat(themes[theme].slice(0, totalCards / 2)) // Create matching pairs
    .sort(() => 0.5 - Math.random());

  const [cards, setCards] = useState(
    shuffledContent.map((content, index) => ({
      id: index,
      content,
      flipped: false,
      matched: false,
    }))
  );
  const [flippedCards, setFlippedCards] = useState([]);

  const handleCardClick = (id) => {
    if (!isGameStarted) {
      setIsGameStarted(true); // Start the timer
    }

    if (flippedCards.length < 2 && !cards[id].flipped && !cards[id].matched) {
      const updatedCards = cards.map((card) =>
        card.id === id ? { ...card, flipped: true } : card
      );
      setCards(updatedCards);
      setFlippedCards([...flippedCards, id]);
      // Play the flip sound only when the card is actually flipping
    playFlipSound();
    }
  };

  const restartGame = () => {
    // Reset all game-related states to their initial values
    setTimer(0);
    setMoves(0);
    setIsGameStarted(false);
    setMovesIncremented(false);
    setMatchedPairs(0);
    setCurrentPlayer(1);
    setShowPopup(false);
    setElapsedTime(0);
    setIsMenuOpen(false);
    resetGameFinishSound();
    resetFlipSound();
    resetMatchSound();
    // Reset player scores
    const resetPlayersInfo = playersInfo.map((player) => ({
      ...player,
      score: 0,
    }));
    setPlayersInfo(resetPlayersInfo);
    // Generate a new shuffled set of cards
    const newShuffledContent = themes[theme]
      .slice(0, totalCards / 2)
      .concat(themes[theme].slice(0, totalCards / 2))
      .sort(() => 0.5 - Math.random());

    const newCards = newShuffledContent.map((content, index) => ({
      id: index,
      content,
      flipped: false,
      matched: false,
    }));

    setCards(newCards); // Update the cards state with the new shuffled cards
    setFlippedCards([]); // Reset flippedCards
  };

  const startNewGame = () => {
    setShowPopup(false);
    resetGameFinishSound();
    resetFlipSound();
    resetMatchSound();
    navigate('/');
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      const [card1, card2] = flippedCards;

      if (players === 1) {
        // Increment moves counter only if it hasn't been incremented for this pair
        if (!movesIncremented) {
          setMoves((prevMoves) => prevMoves + 1);
          setMovesIncremented(true);
        }
      }

      if (cards[card1].content === cards[card2].content) {
        const updatedCards = cards.map((card) =>
          card.id === card1 || card.id === card2
            ? { ...card, matched: true }
            : card
        );
        setCards(updatedCards);
        setFlippedCards([]); // Reset flippedCards after finding a match
       

        setMatchedPairs((prevMatchedPairs) => prevMatchedPairs + 1); // Increment matched pairs
        if (matchedPairs + 1 === totalPairs) {
          setShowPopup(true);
          playGameFinishSound();
        }

        if (players > 1) {
          // Increment the current player's score if a match is found
          setPlayersInfo((prevPlayersInfo) =>
            prevPlayersInfo.map((player) =>
              player.id === currentPlayer
                ? { ...player, score: player.score + 1 }
                : player
            )
          );
        }
        // Add both card IDs to the highlightedMatches state
        setHighlightedMatches([card1, card2]);
        playMatchSound();
        // Clear the highlightedMatches state after a brief delay (e.g., 1500ms)
        setTimeout(() => {
          setHighlightedMatches([]);
        }, 1500);
      } else {
        setTimeout(() => {
          const updatedCards = cards.map((card) =>
            card.id === card1 || card.id === card2
              ? { ...card, flipped: false }
              : card
          );

          setCards(updatedCards);
          setFlippedCards([]); // Reset flippedCards after timeout
          if (players === 1) {
            setMovesIncremented(false);
          } // Reset the flag after timeout

          // Switch to the next player's turn if no match is found
          if (players > 1) {
            setCurrentPlayer((prevPlayer) =>
              prevPlayer === players ? 1 : prevPlayer + 1
            );
          }
        }, 1000);
      }

      // Reset the movesIncremented flag after each pair is flipped, regardless of match
      if (players === 1) {
        setMovesIncremented(false);
      }
    }
  }, [
    flippedCards,
    cards,
    movesIncremented,
    totalPairs,
    players,
    setCurrentPlayer,
    currentPlayer,
    matchedPairs,
    timer,
    playFlipSound,
    playGameFinishSound,
    playMatchSound,
  ]);

  const getWinners = () => {
    const maxScore = Math.max(...playersInfo.map((player) => player.score));
    const winners = playersInfo
      .filter((player) => player.score === maxScore)
      .map((player) => player.id);
    return winners;
  };

  useEffect(() => {
    let timer;

    if (isGameStarted) {
      timer = setInterval(() => {
        // Reset elapsed time on every interval
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    if (matchedPairs === totalPairs) {
      clearInterval(timer); // Clear the interval if all pairs are found
    }

    return () => {
      clearInterval(timer);
    };
  }, [isGameStarted, matchedPairs, totalPairs]);



  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth); // Update the width state on resize
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Empty dependency array ensures the effect runs only once on mount

  const handleMenuOpen = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  return (
    <GamePageWrapper>
    <GamePageHeader>
    
    <LogoWrapper>
        <img src={logoSvg} alt="Logo" />
      </LogoWrapper>
      {width < breakpoint ? (
        <ButtonWrapper>
        <CustomButton fontSize={{
          small: '1rem',
          
        }} height={{
          small: '2.5rem',
          
          
         
         
        }} 
        
        $text="Menu"  $backgroundColor="var(--color-orange)" $textColor="var(--color-background-page)" $textcolorhover="var(--color-background-page)" $backgroundColorHover="var(--color-orange-hover)" onClick={handleMenuOpen}  />
        </ButtonWrapper>

      ) : (
        <ButtonContainer >
      
        <CustomButton
        width={{
          large: '7.9375rem',
        }}

        fontSize={{
          small: '1.25rem',
          large: '1.25rem',
          
         
        }} height={{
          small: '3.25rem',
          large: '3.25rem',
          
         
         
        }} $text="Restart" $backgroundColor="var(--color-orange)" $textColor="var(--color-background-page)" $textcolorhover="var(--color-background-page)" $backgroundColorHover="var(--color-orange-hover)" onClick={restartGame} />
        <CustomButton
        width={{
          large: '9.3125rem',
        }}
        
        fontSize={{
          small: '1.25rem',
          large: '1.25rem',
          
          
        }} height={{
          small: '3.25rem',
          large: '3.25rem',  
        }} $text="New Game" onClick={startNewGame} />
   
        </ButtonContainer>
         
      )}
      {isMenuOpen && width < breakpoint && (
        <MobileButtons
          isOpen={isMenuOpen}
          onClose={handleMenuClose}
          restartGame={restartGame}
          startNewGame={startNewGame}
          resumeGame={() => {
            handleMenuClose();
            // Add logic to resume the game
          }}
        />
      )}

    </GamePageHeader>
     
     
      <GameGrid
        columns={columns}
        cards={cards}
        theme={theme}
        handleCardClick={handleCardClick}
        highlightedMatches={highlightedMatches}
        
      />
      {players === 1 && (
        <SinglePlayerContainer>
        <SinglePlayerScoreBox><SinglePlayerData>Time</SinglePlayerData> <SinglePlayerValue>{formatTime(elapsedTime)}</SinglePlayerValue></SinglePlayerScoreBox>
        <SinglePlayerScoreBox><SinglePlayerData>Moves</SinglePlayerData> <SinglePlayerValue>{moves}</SinglePlayerValue></SinglePlayerScoreBox>
        </SinglePlayerContainer>
      )}
      {players > 1 && (
        <PlayersContainer>
          {playersInfo
            .filter((player) => player.id <= players)
            .map((player) => (
              <PlayerBox
                key={player.id}
                $isCurrent={currentPlayer === player.id}
                title={currentPlayer === player.id ? 'Current Turn' : ''}
              >
              {player.id === currentPlayer && <TriangleIndicator />}
              {player.id === currentPlayer && <MessageIndicator>Current Turn</MessageIndicator>}
                <PlayerName $isCurrent={currentPlayer === player.id}>
                  {width < breakpoint ? `P${player.id}` : player.name}
                </PlayerName>
                <PlayerScore $isCurrent={currentPlayer === player.id}>{player.score}
               
               </PlayerScore>
              </PlayerBox>
             
            ))}
        </PlayersContainer>
       
      )}
      {showPopup && (
        <Popup
          isSinglePlayer={players === 1}
          winners={getWinners()}
          playersInfo={playersInfo.filter((player) => player.id <= players)}
          totalTime={elapsedTime}
          moves={moves}
          restartGame={restartGame}
          startNewGame={startNewGame}
          setShowPopup={setShowPopup}
        />
      )}
    </GamePageWrapper>
  );
};

export default GamePage;

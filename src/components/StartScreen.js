import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import logoSvg from '../assets/logo.svg';
import CustomButton from './CustomButton';

const StartScreenWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 5rem 1.5rem;
  max-width: 40.875rem;
  @media (min-width: 768px) {
   margin: 10.5625rem auto;
  }
  @media (min-width: 1200px) {
    margin: 9.625rem auto;
  }
`;

const LogoWrapper = styled.div`
  width: 7.625rem;
  align-self: center;
  margin-bottom: 2.8125rem;
  @media (min-width: 768px) {
    margin-bottom: 4.875rem;
  }
`;

const WhiteLogo = styled.img`
  filter: invert(100%) sepia(0%) saturate(1%) hue-rotate(0deg) brightness(200%) contrast(200%);
`;

const OptionBoxContainer = styled.div`
  background-color: var(--color-background-page);
  border-radius: 0.625rem;
  padding: 1.5rem; 
  @media (min-width: 768px) {
    padding: 3.5rem;
  }
`;

const OptionBox = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  @media (min-width: 768px) {
    margin-bottom: 2rem;
  }
`;

const OptionTitle = styled.h2`
  font-size: 0.9375rem;
  margin-bottom: 0.6875rem;
  color: var(--color-text);
  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin-bottom: 1rem;
  }
`;

const OptionButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.625rem;
  @media (min-width: 768px) {
    gap: 1.875rem;
  }
`;

const OptionButton = styled.button`
  font-size: 1rem;
  border-radius: 1.625rem;
  height: 2.5rem;
  width: 100%;
  text-align: center;
  background-color: var(--color-menu-idle);
  ${({ selected }) =>
    selected &&
    `
    background-color: var(--color-menu-active);
  `}
  color: var(--color-background-page);
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s;

  @media(hover: hover) and (pointer: fine) {
    &:hover {
      background-color: var(--color-menu-hover);
    }
  }

  &:focus-visible {
    outline: none; 
    box-shadow: 0 0 0 3px var(--color-background), 
                0 0 0 6px var(--color-background-page); 
  }
  @media (min-width: 768px) {
    font-size: 1.625rem;
    height: 3.25rem;
  }
`;

const ButtonWrapper = styled.div`
  margin-top: 2rem;
`;

const StartScreen = () => {
  const navigate = useNavigate();

  const [selectedTheme, setSelectedTheme] = useState('Numbers');
  const [selectedPlayers, setSelectedPlayers] = useState(1);
  const [selectedGridSize, setSelectedGridSize] = useState('4x4');

  const startGame = () => {
    navigate('/game', {
      state: {
        theme: selectedTheme,
        players: selectedPlayers,
        gridSize: selectedGridSize,
      },
    });
  };

  return (
    <StartScreenWrapper>
      <LogoWrapper>
        <WhiteLogo src={logoSvg} alt="Memory Game Logo" />
      </LogoWrapper>
      <OptionBoxContainer>
        {/* Theme selection */}
        <OptionBox>
          <OptionTitle>Select Theme</OptionTitle>
          <OptionButtonContainer>
            <OptionButton
              aria-label="Select Theme: Numbers"
              selected={selectedTheme === 'Numbers'}
              onClick={() => setSelectedTheme('Numbers')}
            >
              Numbers
            </OptionButton>
            <OptionButton
              aria-label="Select Theme: Icons"
              selected={selectedTheme === 'Icons'}
              onClick={() => setSelectedTheme('Icons')}
            >
              Icons
            </OptionButton>
          </OptionButtonContainer>
        </OptionBox>

        {/* Player selection */}
        <OptionBox>
          <OptionTitle>Number of Players</OptionTitle>
          <OptionButtonContainer>
            {[1, 2, 3, 4].map((playerCount) => (
              <OptionButton
                key={playerCount}
                aria-label={`Select ${playerCount} Player${playerCount > 1 ? 's' : ''}`}
                selected={selectedPlayers === playerCount}
                onClick={() => setSelectedPlayers(playerCount)}
              >
                {playerCount}
              </OptionButton>
            ))}
          </OptionButtonContainer>
        </OptionBox>

        {/* Grid size selection */}
        <OptionBox>
          <OptionTitle>Grid Size</OptionTitle>
          <OptionButtonContainer>
            {['4x4', '6x6'].map((size) => (
              <OptionButton
                key={size}
                aria-label={`Select Grid Size: ${size}`}
                selected={selectedGridSize === size}
                onClick={() => setSelectedGridSize(size)}
              >
                {size}
              </OptionButton>
            ))}
          </OptionButtonContainer>
        </OptionBox>

        {/* Start game button */}
        <ButtonWrapper>
          <CustomButton
            aria-label={`Start Game with ${selectedTheme} theme, ${selectedPlayers} player${selectedPlayers > 1 ? 's' : ''}, ${selectedGridSize} grid`}
            $text="Start Game"
            $backgroundColor="var(--color-orange)"
            $textColor="var(--color-background-page)"
            $textcolorhover="var(--color-background-page)"
            $backgroundColorHover="var(--color-orange-hover)"
            onClick={startGame}
          />
        </ButtonWrapper>
      </OptionBoxContainer>
    </StartScreenWrapper>
  );
};

export default StartScreen;
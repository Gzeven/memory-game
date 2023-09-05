// GameGrid.js
import React from 'react';
import styled from 'styled-components';
import Card from './Card';

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.$columns},
    1fr
  );
  margin-top: 20px;
  margin: 0 auto; /* Center the grid horizontally */
  width: 87.2vw;
  aspect-ratio:1/1;
  max-width: ${(props) => (props.$columns === 4 ? '33.25rem' : '35.75rem')};
  gap: ${(props) => (props.$columns === 4 ? '0.75rem' : '0.625rem')};
  
  @media (min-width: 768px) {
    gap: ${(props) => (props.$columns === 4 ? '1.25rem' : '1rem')};
    }
`;

const GameGrid = ({
  columns,
  cards,
  theme,
  handleCardClick,
  highlightedMatches,
  playFlipSound,
  gridSize
  
}) => {
  return (
    <Grid $columns={columns}>
      {cards.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          flipped={card.flipped}
          matched={card.matched}
          content={card.content}
          theme={theme}
          onClick={handleCardClick}
          highlightedMatches={highlightedMatches}
          playFlipSound={playFlipSound}
          gridSize={gridSize}
          columns={columns}
          
        />
      ))}
    </Grid>
  );
};

export default GameGrid;

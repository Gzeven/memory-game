// Card.js
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledCard = styled.div` 
  width: 100%; 
  perspective: 1000px; /* Add perspective for 3D effect */
  position: relative;
  aspect-ratio:1/1;
`;

const CardInner = styled.div`
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 0.5s;
  transform: ${(props) => (props.$flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  cursor: pointer;
`;

const CardFront = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-menu-active);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: absolute;
  backface-visibility: hidden;
  border-radius: 50%;
  /* &:hover {
    background-color: var(--color-menu-hover);
  } */
  @media(hover: hover) and (pointer: fine) {
    &:hover {
    background-color: var(--color-menu-hover);
  }
}

`;

const CardBack = styled.div`
  width: 100%;
  height: 100%;
  color: var(--color-background-page);
    background-color: ${(props) =>
    props.flipped || props.matched || props.$highlighted
      ? 'var(--color-orange)' /* Use the CSS variable */
      : 'var(--color-menu-idle)'}; /* Fallback to the same variable */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  position: absolute;
  backface-visibility: hidden;
  transform: rotateY(180deg);
  border-radius: 50%;

`;

const NumberContent = styled.span`
  font-size: ${(props) => (props.$columns === 4 ? '40px' : '24px')};
  @media (min-width: 768px) {
    font-size: ${(props) => (props.$columns === 4 ? '56px' : '44px')};
    }
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
     font-size: ${(props) => (props.$columns === 4 ? '40px' : '24px')};
  @media (min-width: 768px) {
    font-size: ${(props) => (props.$columns === 4 ? '56px' : '40px')};
    }
`;

const Card = ({
  id,
  flipped,
  content,
  theme,
  onClick,
  highlightedMatches,
  matched,
  columns
}) => {
  const isHighlighted = highlightedMatches.includes(id);

  return (
    <StyledCard
      onClick={() => {
        onClick(id);
   
      }}
    >
      <CardInner $flipped={flipped}>
        <CardBack
          $highlighted={isHighlighted}
          $flipped={flipped}
          $matched={matched}
        >
       
          {theme === 'Numbers' ? (
            <NumberContent $columns={columns}>{content}</NumberContent>
          ) : (
            <StyledFontAwesomeIcon icon={content} $columns={columns}            
            />
          )}
        </CardBack>
        <CardFront />
      </CardInner>
    </StyledCard>
  );
};

export default Card;

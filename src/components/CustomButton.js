import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background-color: var(${(props) => props.backgroundColor || '--primary-color'});
  color: var(${(props) => props.textColor || '--primary-color'});
  border: none;
  height: ${(props) => props.height?.small || '3rem'};
  border-radius: 2.1875rem;
  width: 100%;
  text-align: center;
  cursor: pointer;
  font-size: ${(props) => props.fontSize?.small || '1.125rem'};
  transition: all 0.5s ease;


  &:hover {
    background-color: var(${(props) => props.BackgroundColorHover || ' --color-menu-hover'});
    color: var(${(props) => props.TextColorHover || '--color-background-page'});
  }
  @media (min-width: 768px) {
  
    font-size: ${(props) => props.fontSize?.large || props.fontSize?.small || '2rem'};
    height: ${(props) => props.height?.large || props.fontSize?.small || '4.375rem'};
  
    }

`;

const CustomButton = ({ height, backgroundColor, textColor, BackgroundColorHover, TextColorHover,  text, fontSize, onClick }) => {
  return (
    <ButtonWrapper height={height} fontSize={fontSize} BackgroundColorHover={BackgroundColorHover} TextColorHover={TextColorHover} backgroundColor={backgroundColor} textColor={textColor} onClick={onClick}>
      {text}
    </ButtonWrapper>
  );
};

export default CustomButton;

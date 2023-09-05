import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.button`
  background-color: ${(props) => props.$backgroundColor || 'var(--color-boxes)'};
  color: ${(props) => props.$textColor || 'var(--color-menu-active)'};
  border: none;
  height: ${(props) => props.height?.small || '3rem'};
  border-radius: 2.1875rem;
  width: ${(props) => props.width?.small || '100%'};
  text-align: center;
  cursor: pointer;
  font-size: ${(props) => props.fontSize?.small || '1.125rem'};
  transition: all 0.5s ease;

  &:hover {
    background-color: ${(props) => props.$backgroundColorHover || 'var(--color-menu-hover)'};
    color: ${(props) => props.$textcolorhover || 'var(--color-background-page)'};
  }

  @media (min-width: 768px) {
    font-size: ${(props) => props.fontSize?.large || props.fontSize?.small || '2rem'};
    height: ${(props) => props.height?.large || props.height?.small || '4.375rem'};
    width: ${(props) => props.width?.large || props.width?.small || '100%'};
  }
`;

const CustomButton = ({$textColor, $textcolorhover, $backgroundColor, $backgroundColorHover, ...otherProps}) => {
  return (
    <div>
    <ButtonWrapper {...otherProps}
    $textColor={$textColor}
    $backgroundColor={$backgroundColor}
    $textcolorhover={$textcolorhover}
    $backgroundColorHover={$backgroundColorHover}
    
    
    >
    {otherProps.$text}
    </ButtonWrapper>
    </div>
  );
};

export default CustomButton;


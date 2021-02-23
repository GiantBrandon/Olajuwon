import React from 'react';
import styled from '@emotion/styled'

export interface ButtonProps {
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

const StyledButton = styled.button`
  background: #000000;
  color: #FFFFFF;
  padding: '16px';
`

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = (props) => {
  return (
  <StyledButton>
    {props.children}
  </StyledButton>
  );
};

import React from 'react';
import './Button.scss';

interface ButtonProps {
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  disabled?: boolean;
  buttonStyles?: object;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  buttonText: string;
}

const Button: React.FC<ButtonProps> = props => {
  return (
    <button
      className={`
            ${props.primary ? 'primary-button' : ''} 
            ${props.secondary ? 'secondary-button' : ''}
            ${props.small ? 'small' : ''} 
            ${props.disabled ? 'disabled' : ''} `}
      style={props.buttonStyles}
      disabled={props.disabled}
      onClick={props.onClick}
    >
      {props.buttonText}
    </button>
  );
};

export default Button;

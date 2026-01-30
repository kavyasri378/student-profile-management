import React from 'react';

interface BasicButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  style?: React.CSSProperties;
}

const BasicButton: React.FC<BasicButtonProps> = ({ 
  children, 
  onClick, 
  type = 'button', 
  disabled = false,
  style = {}
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '8px 16px',
        backgroundColor: disabled ? '#ccc' : '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontSize: '14px',
        ...style
      }}
    >
      {children}
    </button>
  );
};

export default BasicButton;

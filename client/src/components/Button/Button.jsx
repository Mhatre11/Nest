import React from 'react';
import PropTypes from 'prop-types';
import { Button as FlowbiteButton } from 'flowbite-react';

export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  ...props 
}) => {
  const variants = {
    primary: '!bg-blue-600 hover:!bg-blue-700',
    secondary: '!bg-gray-600 hover:!bg-gray-700',
    success: '!bg-green-600 hover:!bg-green-700',
    danger: '!bg-red-600 hover:!bg-red-700',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <FlowbiteButton
      {...props}
      className={`transition-colors duration-200 ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </FlowbiteButton>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
};

export default Button;

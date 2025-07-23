import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = true,
}) => {
  const baseClasses = 'card';
  const hoverClasses = hoverEffect ? 'hover:shadow-lg' : '';
  const clickClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${clickClasses} ${className}`} 
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
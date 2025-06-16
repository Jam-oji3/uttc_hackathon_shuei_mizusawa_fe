import React from 'react';
import iconSrc from '../../assets/hackathonLogo.png'; // Ensure the image is imported for bundling

type Props = {
  size?: number;
  alt?: string;
  className?: string;
};

const AppIcon: React.FC<Props> = ({ size = 32, alt = 'App Icon', className }) => {
  return <img
    src={iconSrc} 
    width={size} 
    height={size} 
    alt={alt} 
    className={className}
    />;
};

export default AppIcon;

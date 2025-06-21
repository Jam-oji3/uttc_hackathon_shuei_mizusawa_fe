import React from 'react';

type Props = {
  size?: number;
  alt?: string;
  className?: string;
};

const AppIcon: React.FC<Props> = ({ size = 32, alt = 'App Icon', className }) => {
  return (
    <img
      src="/assets/hackathonLogo.png"
      width={size}
      height={size}
      alt={alt}
      className={className}
    />
  );
};

export default AppIcon;

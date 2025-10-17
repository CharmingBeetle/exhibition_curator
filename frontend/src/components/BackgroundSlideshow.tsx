import React from 'react';

// Import the single alina-grubnyak image
import alinaImage from '../assets/artBackdrops/alina-grubnyak-IsxaFsXi2rs-unsplash.jpg?url';

interface BackgroundImageProps {
  className?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({ className = '' }) => {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <img 
        src={alinaImage}
        alt="Art Gallery Background"
        className="w-full h-full object-cover"
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default BackgroundImage;

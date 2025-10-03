
import React, { useState } from 'react';

interface ImageCardProps {
  src: string;
  alt: string;
}

export const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out relative">
      {!isLoaded && (
        <div className="absolute inset-0 bg-gray-700 animate-pulse"></div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
        loading="lazy"
      />
    </div>
  );
};

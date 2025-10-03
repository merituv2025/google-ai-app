
import React from 'react';
import { ImageCard } from './ImageCard';

interface ImageGalleryProps {
  images: string[];
  prompt: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, prompt }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {images.map((src, index) => (
        <ImageCard key={index} src={src} alt={`${prompt} - Image ${index + 1}`} />
      ))}
    </div>
  );
};

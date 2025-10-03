
import React, { useState, useCallback } from 'react';
import { SearchBar } from './components/SearchBar';
import { ImageGallery } from './components/ImageGallery';
import { Loader } from './components/Loader';
import { generateImagesFromPrompt } from './services/geminiService';

const App: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [lastPrompt, setLastPrompt] = useState<string>('');

  const handleSearch = useCallback(async (prompt: string) => {
    if (!prompt.trim()) {
      setError("Please enter a search prompt.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setImages([]); // Clear previous images
    setLastPrompt(prompt);

    try {
      const generatedImages = await generateImagesFromPrompt(prompt);
      if (generatedImages.length === 0) {
        setError("No images could be generated for this prompt. Please try a different one.");
      }
      setImages(generatedImages);
    } catch (err) {
      console.error(err);
      setError("Failed to generate images. Please check your API key and try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <header className="bg-gray-800/50 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-4">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
                AI Image Gallery
              </h1>
              <p className="text-sm text-gray-400 mt-1">Powered by Gemini</p>
            </div>
            <div className="w-full sm:max-w-md">
              <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading && <Loader />}
        
        {error && (
          <div className="flex flex-col items-center justify-center text-center text-red-400 bg-red-900/20 rounded-lg p-8 h-64">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
             </svg>
             <p className="text-lg font-semibold">An error occurred</p>
             <p>{error}</p>
          </div>
        )}

        {!isLoading && !error && images.length > 0 && (
          <ImageGallery images={images} prompt={lastPrompt} />
        )}

        {!isLoading && !error && images.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center text-gray-400 h-64 sm:h-96">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-semibold text-gray-300">Welcome to the Gallery</h2>
            <p className="mt-2 max-w-md">
              Enter a description in the search bar above to generate images with AI. For example, "a photorealistic cat wearing a spacesuit".
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;

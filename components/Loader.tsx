
import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center text-gray-400 h-64 sm:h-96">
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-indigo-500"></div>
      <h2 className="text-xl font-semibold text-gray-300 mt-6">Generating Images...</h2>
      <p className="mt-2 max-w-sm">
        The AI is working its magic. This might take a moment, please be patient.
      </p>
    </div>
  );
};

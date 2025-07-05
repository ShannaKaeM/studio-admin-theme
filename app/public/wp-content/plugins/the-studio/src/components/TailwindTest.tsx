import React from 'react';

export const TailwindTest: React.FC = () => {
  return (
    <div className="p-6 bg-blue-50 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-blue-900 mb-4">
        Tailwind CSS v4 is Working! 
      </h2>
      <p className="text-gray-700">
        If you see this styled box with padding, background color, and shadow, 
        then Tailwind is properly integrated.
      </p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
        Test Button
      </button>
    </div>
  );
};
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../utils/helpers.js';
import { reloadTailwindStyles } from '../TailwindLoader.jsx';
import { useStore } from '../storage/store.js';

export function TailwindDemo() {
  const [isReloading, setIsReloading] = useState(false);
  const { settings } = useStore();

  const handleReloadStyles = async () => {
    setIsReloading(true);
    try {
      await reloadTailwindStyles();
      setTimeout(() => setIsReloading(false), 1000);
    } catch (error) {
      console.error('Failed to reload styles:', error);
      setIsReloading(false);
    }
  };

  return (
    <motion.div
      className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl border border-blue-200 shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-xs font-bold">TW</span>
          </div>
          <h3 className="text-lg font-semibold text-blue-900">
            Tailwind CSS Demo
          </h3>
        </div>
        
        <motion.button
          onClick={handleReloadStyles}
          disabled={isReloading}
          className={cn(
            "p-2 rounded-lg text-blue-600 hover:bg-blue-200 transition-colors",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Reload Tailwind Styles"
        >
          <motion.svg 
            className="h-4 w-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
            animate={isReloading ? { rotate: 360 } : { rotate: 0 }}
            transition={{ duration: 1, repeat: isReloading ? Infinity : 0, ease: "linear" }}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
            />
          </motion.svg>
        </motion.button>
      </div>

      {/* Description */}
      <p className="text-sm text-blue-700 mb-4 leading-relaxed">
        These styles are loaded dynamically from the WordPress API into the Shadow DOM. 
        Changes to your Tailwind CSS will be reflected here after rebuilding.
      </p>

      {/* Demo Elements Grid */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {/* Color Palette */}
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-2">Color Palette</h4>
          <div className="flex space-x-1">
            <div className="w-6 h-6 bg-red-500 rounded shadow-sm" title="Red 500"></div>
            <div className="w-6 h-6 bg-green-500 rounded shadow-sm" title="Green 500"></div>
            <div className="w-6 h-6 bg-blue-500 rounded shadow-sm" title="Blue 500"></div>
            <div className="w-6 h-6 bg-yellow-500 rounded shadow-sm" title="Yellow 500"></div>
            <div className="w-6 h-6 bg-purple-500 rounded shadow-sm" title="Purple 500"></div>
            <div className="w-6 h-6 bg-pink-500 rounded shadow-sm" title="Pink 500"></div>
          </div>
        </div>

        {/* Spacing */}
        <div>
          <h4 className="text-sm font-medium text-blue-800 mb-2">Spacing</h4>
          <div className="space-y-1">
            <div className="h-2 bg-blue-300 rounded" style={{width: '1rem'}} title="w-4"></div>
            <div className="h-2 bg-blue-400 rounded" style={{width: '2rem'}} title="w-8"></div>
            <div className="h-2 bg-blue-500 rounded" style={{width: '3rem'}} title="w-12"></div>
            <div className="h-2 bg-blue-600 rounded" style={{width: '4rem'}} title="w-16"></div>
          </div>
        </div>
      </div>

      {/* Interactive Elements */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-blue-800">Interactive Elements</h4>
        
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm">
            Primary Button
          </button>
          <button className="px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 text-sm font-medium rounded-lg transition-colors">
            Secondary Button
          </button>
          <button className="px-3 py-1.5 border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-medium rounded-lg transition-colors">
            Outline Button
          </button>
        </div>

        {/* Form Elements */}
        <div className="grid grid-cols-2 gap-3">
          <input 
            type="text" 
            placeholder="Text input" 
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white">
            <option>Select option</option>
            <option>Option 1</option>
            <option>Option 2</option>
          </select>
        </div>

        {/* Badge Examples */}
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Success
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            Warning
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            Error
          </span>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Info
          </span>
        </div>
      </div>

      {/* Feature List */}
      <div className="mt-4 pt-4 border-t border-blue-200">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Features Demonstrated</h4>
        <ul className="text-xs text-blue-600 space-y-1">
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Dynamic CSS loading from WordPress API</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Shadow DOM style isolation</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Tailwind utility classes</span>
          </li>
          <li className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
            <span>Responsive design components</span>
          </li>
        </ul>
      </div>

      {/* Status */}
      <div className="mt-4 flex items-center justify-between text-xs text-blue-600">
        <span>Tailwind CSS v4.1.11</span>
        <span className="flex items-center space-x-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span>Styles Active</span>
        </span>
      </div>
    </motion.div>
  );
}
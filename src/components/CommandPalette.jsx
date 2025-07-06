import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../storage/store.js';
import { DEMO_COMMANDS } from '../utils/constants.js';
import { cn } from '../utils/helpers.js';

export function CommandPalette({ onCommandSelect }) {
  const { 
    searchQuery, 
    selectedCommandIndex, 
    setSearchQuery, 
    setSelectedCommandIndex,
    getFilteredCommands 
  } = useStore();

  const filteredCommands = getFilteredCommands(DEMO_COMMANDS);

  useEffect(() => {
    // Reset selection when filtered commands change
    if (selectedCommandIndex >= filteredCommands.length) {
      setSelectedCommandIndex(0);
    }
  }, [filteredCommands.length, selectedCommandIndex, setSelectedCommandIndex]);

  const handleCommandClick = (command) => {
    if (onCommandSelect) {
      onCommandSelect(command);
    }
  };

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setSelectedCommandIndex(Math.min(filteredCommands.length - 1, selectedCommandIndex + 1));
        break;
      case 'ArrowUp':
        event.preventDefault();
        setSelectedCommandIndex(Math.max(0, selectedCommandIndex - 1));
        break;
      case 'Enter':
        event.preventDefault();
        if (filteredCommands[selectedCommandIndex]) {
          handleCommandClick(filteredCommands[selectedCommandIndex]);
        }
        break;
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Search Input */}
      <div className="relative p-4 border-b border-gray-700">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg 
              className="h-5 w-5 text-gray-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <input
            type="text"
            className={cn(
              "w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg",
              "text-white placeholder-gray-400 focus:outline-none focus:border-blue-500",
              "transition-colors duration-200"
            )}
            placeholder="Search commands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
            aria-label="Search commands"
            role="searchbox"
          />
        </div>
      </div>

      {/* Commands List */}
      <div className="flex-1 overflow-y-auto p-2">
        {filteredCommands.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-gray-400">
            <svg 
              className="h-12 w-12 mb-4" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
              />
            </svg>
            <p className="text-sm">No commands found</p>
            <p className="text-xs mt-1">Try adjusting your search</p>
          </div>
        ) : (
          <div className="space-y-1">
            {filteredCommands.map((command, index) => (
              <CommandItem
                key={command.id}
                command={command}
                isSelected={index === selectedCommandIndex}
                onClick={() => handleCommandClick(command)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-700 bg-gray-800/50">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">↑↓</kbd>
              <span className="ml-2">Navigate</span>
            </span>
            <span className="flex items-center">
              <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Enter</kbd>
              <span className="ml-2">Select</span>
            </span>
          </div>
          <div className="flex items-center">
            <kbd className="px-2 py-1 bg-gray-700 rounded text-xs">Esc</kbd>
            <span className="ml-2">Close</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function CommandItem({ command, isSelected, onClick, index }) {
  return (
    <motion.button
      className={cn(
        "w-full p-3 rounded-lg text-left transition-all duration-150",
        "flex items-start space-x-3 group",
        isSelected 
          ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-500 ring-opacity-50" 
          : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/70"
      )}
      onClick={onClick}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Icon */}
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-lg",
        isSelected ? "bg-white/20" : "bg-gray-700"
      )}>
        {command.icon}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className={cn(
          "font-medium text-sm mb-1 truncate",
          isSelected ? "text-white" : "text-gray-200"
        )}>
          {command.title}
        </div>
        <div className={cn(
          "text-xs leading-relaxed",
          isSelected ? "text-blue-100" : "text-gray-400"
        )}>
          {command.description}
        </div>
        
        {/* Category Badge */}
        {command.category && (
          <div className="mt-2">
            <span className={cn(
              "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
              isSelected 
                ? "bg-white/20 text-white" 
                : "bg-gray-700 text-gray-400"
            )}>
              {command.category}
            </span>
          </div>
        )}
      </div>

      {/* Action Indicator */}
      {command.action && (
        <div className="flex-shrink-0 flex items-center">
          <svg 
            className={cn(
              "h-4 w-4",
              isSelected ? "text-white" : "text-gray-500"
            )} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 5l7 7-7 7" 
            />
          </svg>
        </div>
      )}
    </motion.button>
  );
}
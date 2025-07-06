import React from 'react';
import { motion } from 'framer-motion';
import { useStore } from '../storage/store.js';
import { cn } from '../utils/helpers.js';

export function PanelHeader({ onClose, onSettingsClick }) {
  const { settings } = useStore();

  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-700 bg-gray-900/95 backdrop-blur-sm">
      {/* Logo and Title */}
      <div className="flex items-center space-x-3">
        <motion.div
          className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <span className="text-white text-lg font-bold">🚀</span>
        </motion.div>
        
        <div>
          <h2 className="text-lg font-semibold text-white leading-tight">
            Shadow Plugin
          </h2>
          <p className="text-xs text-gray-400">
            React + Tailwind + Zustand Boilerplate
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-2">
        {/* Status Indicator */}
        <StatusIndicator />
        
        {/* Settings Button */}
        <motion.button
          onClick={onSettingsClick}
          className={cn(
            "p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800",
            "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Open Settings"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
            />
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
            />
          </svg>
        </motion.button>

        {/* Close Button */}
        <motion.button
          onClick={onClose}
          className={cn(
            "p-2 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800",
            "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Close Panel (Esc)"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </motion.button>
      </div>
    </div>
  );
}

function StatusIndicator() {
  const [status, setStatus] = React.useState('online');
  const [lastPing, setLastPing] = React.useState(Date.now());

  // Simulate connection status check
  React.useEffect(() => {
    const checkConnection = async () => {
      try {
        const wpData = window.shadowPluginData;
        if (wpData?.apiUrl) {
          // Simple ping to check if API is available
          const response = await fetch(`${wpData.apiUrl}`, { method: 'HEAD' });
          setStatus(response.ok ? 'online' : 'offline');
        } else {
          setStatus('offline');
        }
        setLastPing(Date.now());
      } catch (error) {
        setStatus('offline');
        setLastPing(Date.now());
      }
    };

    checkConnection();
    const interval = setInterval(checkConnection, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const statusConfig = {
    online: {
      color: 'bg-green-500',
      pulse: 'animate-pulse',
      text: 'Connected',
      icon: '🟢'
    },
    offline: {
      color: 'bg-red-500',
      pulse: '',
      text: 'Disconnected',
      icon: '🔴'
    },
    connecting: {
      color: 'bg-yellow-500',
      pulse: 'animate-pulse',
      text: 'Connecting...',
      icon: '🟡'
    }
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center space-x-2 px-3 py-1 bg-gray-800 rounded-full">
      <motion.div
        className={cn("w-2 h-2 rounded-full", config.color, config.pulse)}
        animate={status === 'online' ? { scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <span className="text-xs text-gray-400 font-medium">
        {config.text}
      </span>
    </div>
  );
}
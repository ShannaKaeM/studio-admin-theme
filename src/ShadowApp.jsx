import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShadowStyles } from './ShadowStyles';

export function ShadowApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  // Demo commands to show the boilerplate is working
  const commands = [
    {
      id: 'working',
      title: 'Shadow Plugin Boilerplate is Working! 🎉',
      description: 'The React Shadow DOM architecture is successfully loaded',
      icon: '✅'
    },
    {
      id: 'styles',
      title: 'Raycast Design System Active',
      description: 'Full design system with colors, spacing, and components',
      icon: '🎨'
    },
    {
      id: 'isolation',
      title: 'Style Isolation Working',
      description: 'Shadow DOM prevents WordPress style conflicts',
      icon: '🛡️'
    },
    {
      id: 'api',
      title: 'WordPress API Ready',
      description: 'REST endpoints configured and ready for data',
      icon: '🔌'
    }
  ];

  const filteredCommands = commands.filter(command =>
    command.title.toLowerCase().includes(query.toLowerCase()) ||
    command.description.toLowerCase().includes(query.toLowerCase())
  );

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === '`') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-open on mount to show it's working
  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ShadowStyles />
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="shadow-plugin-panel right"
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: '500px',
              zIndex: 9999999
            }}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="shadow-plugin-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                <span style={{ fontSize: '18px' }}>🚀</span>
                <h2 style={{ 
                  margin: 0, 
                  fontSize: '16px', 
                  fontWeight: '600',
                  color: 'var(--raycast-text-primary)'
                }}>
                  Shadow Plugin Boilerplate
                </h2>
              </div>
              
              <button
                className="shadow-button shadow-button-sm shadow-button-ghost"
                onClick={() => setIsOpen(false)}
                title="Close Panel"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* Command Palette */}
            <div className="shadow-command-container">
              <div className="shadow-command-input-wrapper">
                <div className="shadow-command-search-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="m21 21-4.35-4.35"/>
                  </svg>
                </div>
                <input
                  type="text"
                  className="shadow-command-input"
                  placeholder="Search to test the boilerplate..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              <div className="shadow-command-list">
                {filteredCommands.map((command, index) => (
                  <motion.div
                    key={command.id}
                    className="shadow-command-item"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.1 }}
                    style={{ cursor: 'default' }}
                  >
                    <div className="shadow-command-item-content">
                      <span style={{ fontSize: '18px' }}>
                        {command.icon}
                      </span>
                      <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
                        <div style={{ 
                          fontWeight: '500', 
                          fontSize: '14px',
                          marginBottom: '2px',
                          color: 'var(--raycast-text-primary)'
                        }}>
                          {command.title}
                        </div>
                        <div style={{ 
                          fontSize: '12px', 
                          color: 'var(--raycast-text-secondary)',
                          lineHeight: '1.4'
                        }}>
                          {command.description}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                padding: 'var(--space-4)',
                borderTop: '1px solid var(--raycast-border)',
                background: 'var(--raycast-surface)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--raycast-text-secondary)',
                  marginBottom: 'var(--space-2)'
                }}>
                  Press <code style={{ 
                    background: 'var(--raycast-bg)', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)'
                  }}>Cmd/Ctrl + `</code> to toggle
                </div>
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--raycast-text-tertiary)'
                }}>
                  Boilerplate ready for your awesome plugin! 🎨
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global trigger button for demo */}
      {!isOpen && (
        <motion.button
          className="shadow-button shadow-button-default"
          onClick={() => setIsOpen(true)}
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            zIndex: 9999998
          }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 }}
        >
          🚀 Open Boilerplate Demo
        </motion.button>
      )}
    </>
  );
}
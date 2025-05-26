import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';
import * as Label from '@radix-ui/react-label';
import { ShadowStyles } from './ShadowStyles';

export function ShadowApp(props = {}) {
  // Extract props passed from PHP/server-side
  const {
    userRole = 'guest',
    siteUrl = window.location.origin,
    userId = 0,
    settings = {},
    apiNonce = '',
    pluginVersion = '1.0.0',
    isAdmin = false,
    theme = 'dark'
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [enableNotifications, setEnableNotifications] = useState(settings.notifications || false);

  // Demo commands that show server data integration
  const commands = [
    {
      id: 'working',
      title: 'Shadow Plugin Boilerplate is Working! 🎉',
      description: 'The React Shadow DOM architecture is successfully loaded',
      icon: '✅'
    },
    {
      id: 'props',
      title: `Server Props Working - User: ${userRole}`,
      description: `Received data from PHP: Site URL, User ID: ${userId}, Admin: ${isAdmin ? 'Yes' : 'No'}`,
      icon: '🔗'
    },
    {
      id: 'radix',
      title: 'Radix UI Components Active',
      description: 'Dialog, Tabs, Switch components loaded and styled',
      icon: '⚡'
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
      title: `WordPress API Ready - Nonce: ${apiNonce ? 'Set' : 'Missing'}`,
      description: `REST endpoints configured and ready for data. Version: ${pluginVersion}`,
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

              {/* Footer with Radix Dialog Demo */}
              <div style={{
                padding: 'var(--space-4)',
                borderTop: '1px solid var(--raycast-border)',
                background: 'var(--raycast-surface)',
                textAlign: 'center'
              }}>
                <div style={{ 
                  fontSize: '12px', 
                  color: 'var(--raycast-text-secondary)',
                  marginBottom: 'var(--space-3)'
                }}>
                  Press <code style={{ 
                    background: 'var(--raycast-bg)', 
                    padding: '2px 6px', 
                    borderRadius: '4px',
                    fontFamily: 'var(--font-mono)'
                  }}>Cmd/Ctrl + `</code> to toggle
                </div>
                
                {/* Radix UI Dialog Demo */}
                <Dialog.Root open={settingsOpen} onOpenChange={setSettingsOpen}>
                  <Dialog.Trigger asChild>
                    <button className="shadow-button shadow-button-default" style={{ marginBottom: 'var(--space-2)' }}>
                      ⚙️ Radix Settings Demo
                    </button>
                  </Dialog.Trigger>
                  <Dialog.Portal>
                    <Dialog.Overlay style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                      position: 'fixed',
                      inset: 0,
                      zIndex: 10000000
                    }} />
                    <Dialog.Content style={{
                      backgroundColor: 'var(--raycast-surface)',
                      borderRadius: '12px',
                      boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)',
                      position: 'fixed',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: '90vw',
                      maxWidth: '500px',
                      maxHeight: '85vh',
                      padding: 'var(--space-6)',
                      zIndex: 10000001,
                      border: '1px solid var(--raycast-border)'
                    }}>
                      <Dialog.Title style={{
                        margin: 0,
                        fontSize: '18px',
                        fontWeight: '600',
                        color: 'var(--raycast-text-primary)',
                        marginBottom: 'var(--space-4)'
                      }}>
                        Plugin Settings
                      </Dialog.Title>
                      
                      <Tabs.Root defaultValue="general" style={{ width: '100%' }}>
                        <Tabs.List style={{
                          display: 'flex',
                          borderBottom: '1px solid var(--raycast-border)',
                          marginBottom: 'var(--space-4)'
                        }}>
                          <Tabs.Trigger 
                            value="general" 
                            style={{
                              padding: 'var(--space-2) var(--space-3)',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: 'var(--raycast-text-secondary)',
                              cursor: 'pointer',
                              borderBottom: '2px solid transparent'
                            }}
                            data-state="active"
                          >
                            General
                          </Tabs.Trigger>
                          <Tabs.Trigger 
                            value="advanced" 
                            style={{
                              padding: 'var(--space-2) var(--space-3)',
                              backgroundColor: 'transparent',
                              border: 'none',
                              color: 'var(--raycast-text-secondary)',
                              cursor: 'pointer',
                              borderBottom: '2px solid transparent'
                            }}
                          >
                            Advanced
                          </Tabs.Trigger>
                        </Tabs.List>
                        
                        <Tabs.Content value="general">
                          <div style={{ marginBottom: 'var(--space-4)' }}>
                            <div style={{ 
                              fontSize: '14px', 
                              color: 'var(--raycast-text-primary)',
                              marginBottom: 'var(--space-2)'
                            }}>
                              Server Data:
                            </div>
                            <div style={{ 
                              fontSize: '12px', 
                              color: 'var(--raycast-text-secondary)',
                              fontFamily: 'var(--font-mono)',
                              backgroundColor: 'var(--raycast-bg)',
                              padding: 'var(--space-3)',
                              borderRadius: '8px',
                              border: '1px solid var(--raycast-border)'
                            }}>
                              User Role: {userRole}<br/>
                              Site URL: {siteUrl}<br/>
                              User ID: {userId}<br/>
                              Is Admin: {isAdmin ? 'Yes' : 'No'}<br/>
                              Plugin Version: {pluginVersion}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
                            <Switch.Root
                              checked={enableNotifications}
                              onCheckedChange={setEnableNotifications}
                              style={{
                                width: '42px',
                                height: '24px',
                                backgroundColor: enableNotifications ? 'var(--raycast-primary)' : 'var(--raycast-border)',
                                borderRadius: '12px',
                                position: 'relative',
                                border: 'none',
                                cursor: 'pointer'
                              }}
                            >
                              <Switch.Thumb style={{
                                display: 'block',
                                width: '20px',
                                height: '20px',
                                backgroundColor: 'white',
                                borderRadius: '10px',
                                transition: 'transform 100ms',
                                transform: enableNotifications ? 'translateX(20px)' : 'translateX(2px)',
                                position: 'absolute',
                                top: '2px'
                              }} />
                            </Switch.Root>
                            <Label.Root style={{
                              fontSize: '14px',
                              color: 'var(--raycast-text-primary)',
                              cursor: 'pointer'
                            }}>
                              Enable Notifications
                            </Label.Root>
                          </div>
                        </Tabs.Content>
                        
                        <Tabs.Content value="advanced">
                          <div style={{ 
                            fontSize: '14px', 
                            color: 'var(--raycast-text-secondary)',
                            textAlign: 'center',
                            padding: 'var(--space-4)'
                          }}>
                            Advanced settings would go here...
                          </div>
                        </Tabs.Content>
                      </Tabs.Root>
                      
                      <div style={{ 
                        display: 'flex', 
                        justifyContent: 'flex-end', 
                        gap: 'var(--space-2)',
                        marginTop: 'var(--space-6)'
                      }}>
                        <Dialog.Close asChild>
                          <button className="shadow-button shadow-button-ghost">
                            Cancel
                          </button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <button className="shadow-button shadow-button-default">
                            Save Settings
                          </button>
                        </Dialog.Close>
                      </div>
                      
                      <Dialog.Close asChild>
                        <button
                          style={{
                            position: 'absolute',
                            top: 'var(--space-3)',
                            right: 'var(--space-3)',
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'var(--raycast-text-secondary)',
                            cursor: 'pointer',
                            padding: 'var(--space-1)',
                            borderRadius: '4px'
                          }}
                          aria-label="Close"
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </Dialog.Close>
                    </Dialog.Content>
                  </Dialog.Portal>
                </Dialog.Root>
                
                <div style={{ 
                  fontSize: '11px', 
                  color: 'var(--raycast-text-tertiary)'
                }}>
                  Boilerplate with Radix UI + Server Props! 🎨
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
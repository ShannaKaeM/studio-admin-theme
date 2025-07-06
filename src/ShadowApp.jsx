import React, { useEffect } from 'react';
import { useStore, useWordPressStore } from './storage/store.js';
import { ShadowStyles } from './ShadowStyles.jsx';
import { TailwindLoader } from './TailwindLoader.jsx';
import { Panel } from './components/Panel.jsx';

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

  const { openPanel, updateSettings } = useStore();
  const { setServerData } = useWordPressStore();

  // Initialize server data from props
  useEffect(() => {
    setServerData({
      userRole,
      siteUrl,
      userId,
      settings,
      apiNonce,
      pluginVersion,
      isAdmin,
      theme
    });

    // Update store settings with any server settings
    if (settings && Object.keys(settings).length > 0) {
      updateSettings(settings);
    }
  }, [userRole, siteUrl, userId, settings, apiNonce, pluginVersion, isAdmin, theme, setServerData, updateSettings]);

  // Auto-open panel on mount for demo (based on settings)
  useEffect(() => {
    const { autoOpenPanel } = useStore.getState().settings;
    if (autoOpenPanel && window.innerWidth > 768) { // Don't auto-open on mobile
      const timer = setTimeout(() => openPanel(), 500);
      return () => clearTimeout(timer);
    }
  }, [openPanel]);

  return (
    <>
      {/* Load Tailwind styles dynamically */}
      <TailwindLoader />
      
      {/* Load Raycast design system */}
      <ShadowStyles />
      
      {/* Main panel component */}
      <Panel />
    </>
  );
}
import React, { useEffect } from 'react';
import { useStore, useWordPressStore } from './storage/store.js';
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
    theme = 'dark',
    tailwindCSS = ''
  } = props;

  const { openPanel, updateSettings } = useStore();
  const { setServerData } = useWordPressStore();

  // Initialize server data from props (only run once)
  useEffect(() => {
    setServerData({
      userRole,
      siteUrl,
      userId,
      settings,
      apiNonce,
      pluginVersion,
      isAdmin,
      theme,
      tailwindCSS
    });

    // Update store settings with any server settings
    if (settings && Object.keys(settings).length > 0) {
      updateSettings(settings);
    }
  }, []); // Empty dependency array to run only once

  // Auto-open panel on mount for demo (based on settings)
  useEffect(() => {
    const { autoOpenPanel } = useStore.getState().settings;
    if (autoOpenPanel && window.innerWidth > 768) { // Don't auto-open on mobile
      const timer = setTimeout(() => openPanel(), 500);
      return () => clearTimeout(timer);
    }
  }, [openPanel]);

  // Decode the base64 CSS content
  const decodedCSS = tailwindCSS ? atob(tailwindCSS) : '';


  return (
    <>
      {/* Inject Tailwind CSS directly as a style tag */}
      {decodedCSS && (
        <style dangerouslySetInnerHTML={{ __html: decodedCSS }} />
      )}
      
      {/* Main panel component */}
      <Panel />
    </>
  );
}
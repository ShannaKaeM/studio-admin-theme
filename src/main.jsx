import React from 'react';
import ReactDOM from 'react-dom/client';
import r2wc from '@r2wc/react-to-web-component';
import { ShadowApp } from './ShadowApp';

// Create the web component with props support
const ShadowPluginElement = r2wc(ShadowApp, React, ReactDOM, {
  shadow: 'open',
  props: {
    // Define the props that can be passed via attributes
    userRole: 'string',
    siteUrl: 'string', 
    userId: 'number',
    settings: 'json',
    apiNonce: 'string',
    pluginVersion: 'string',
    isAdmin: 'boolean',
    theme: 'string'
  }
});

// Register the web component
customElements.define('shadow-plugin-panel', ShadowPluginElement);

// Export for global access
window.ShadowPlugin = {
  ShadowApp,
  init: () => {
    console.log('Shadow Plugin Boilerplate initialized');
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  window.ShadowPlugin.init();
});
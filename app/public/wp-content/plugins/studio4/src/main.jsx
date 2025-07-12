import React from 'react';
import ReactDOM from 'react-dom/client';
import { ShadowApp } from './ShadowApp';
import './styles/main.css';
import './styles/admin-ui.css';

// Custom web component with proper shadow DOM
class Studio4Element extends HTMLElement {
  constructor() {
    super();
    
    // Create shadow DOM
    this.attachShadow({ mode: 'open' });
    
    this.root = null;
  }
  
  connectedCallback() {
    this.render();
  }
  
  disconnectedCallback() {
    if (this.root) {
      this.root.unmount();
    }
  }
  
  attributeChangedCallback() {
    this.render();
  }
  
  static get observedAttributes() {
    return ['user-role', 'site-url', 'user-id', 'settings', 'api-nonce', 'plugin-version', 'is-admin', 'theme', 'tailwind-css', 'full-page'];
  }
  
  render() {
    // Safe JSON parsing
    let settings = {};
    try {
      const settingsAttr = this.getAttribute('settings');
      if (settingsAttr && settingsAttr.trim() !== '') {
        settings = JSON.parse(settingsAttr);
      }
    } catch (e) {
      // Silently handle invalid JSON
      settings = {};
    }

    const props = {
      userRole: this.getAttribute('user-role') || 'guest',
      siteUrl: this.getAttribute('site-url') || window.location.origin,
      userId: parseInt(this.getAttribute('user-id')) || 0,
      settings: settings,
      apiNonce: this.getAttribute('api-nonce') || '',
      pluginVersion: this.getAttribute('plugin-version') || '1.0.0',
      isAdmin: this.getAttribute('is-admin') === 'true',
      theme: this.getAttribute('theme') || 'dark',
      tailwindCSS: this.getAttribute('tailwind-css') || '',
      fullPage: this.getAttribute('full-page') === 'true'
    };
    
    if (!this.root) {
      this.root = ReactDOM.createRoot(this.shadowRoot);
    }
    
    this.root.render(React.createElement(ShadowApp, props));
  }
}

// Register the web component
customElements.define('studio4-builder', Studio4Element);

// Export for global access
window.Studio4 = {
  ShadowApp,
  init: () => {
    // Plugin initialized
  }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', () => {
  window.Studio4.init();
});
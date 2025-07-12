import React from 'react';
import ReactDOM from 'react-dom/client';
import { ShadowApp } from './ShadowApp';
import './styles/main.css';
import './styles/ui-components.css';

// Custom web component with Shadow DOM isolation
class Studio1Element extends HTMLElement {
  constructor() {
    super();
    
    // Create shadow DOM for complete isolation
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
  
  render() {
    // Create container for React app
    const container = document.createElement('div');
    container.id = 'studio1-app-container';
    
    // Clear shadow root and append container
    this.shadowRoot.innerHTML = '';
    this.shadowRoot.appendChild(container);
    
    // Create React root and render app
    this.root = ReactDOM.createRoot(container);
    this.root.render(<ShadowApp />);
  }
}

// Register the custom element
if (!customElements.get('studio1-element')) {
  customElements.define('studio1-element', Studio1Element);
}

// Also render in admin page if container exists
const adminContainer = document.getElementById('studio1-admin-root');
if (adminContainer) {
  const root = ReactDOM.createRoot(adminContainer);
  root.render(<ShadowApp isAdmin={true} />);
}

// Render in frontend page if container exists
const frontendContainer = document.getElementById('studio1-frontend-root');
if (frontendContainer) {
  const root = ReactDOM.createRoot(frontendContainer);
  root.render(<ShadowApp isFrontend={true} />);
}

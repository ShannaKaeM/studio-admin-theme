import { useEffect, useState } from 'react';

/**
 * TailwindLoader Component
 * 
 * Fetches compiled Tailwind CSS from the WordPress API and injects it into the Shadow DOM
 */
export function TailwindLoader() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [loadingState, setLoadingState] = useState('loading');

  useEffect(() => {
    const loadTailwindStyles = async () => {
      try {
        setLoadingState('loading');
        
        // Get API URL from WordPress localized script or construct it
        const apiUrl = window.shadowPluginData?.apiUrl || '/wp-json/shadow-plugin/v1/';
        const tailwindUrl = `${apiUrl}tailwind-styles`;
        
        // Add cache busting parameter based on build time
        const cacheBust = Date.now();
        const fetchUrl = `${tailwindUrl}?cache_bust=${cacheBust}`;
        
        const response = await fetch(fetchUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
          throw new Error(data.message || 'Failed to load Tailwind styles');
        }
        
        // Inject CSS into Shadow DOM
        const shadowRoot = document.querySelector('shadow-plugin-panel')?.shadowRoot;
        if (shadowRoot) {
          injectTailwindStyles(shadowRoot, data.css);
          setIsLoaded(true);
          setLoadingState('loaded');
          
          // Log success for debugging
          console.log('Tailwind CSS loaded successfully:', {
            size: data.size,
            file: data.file_path,
            lastModified: data.last_modified
          });
        } else {
          throw new Error('Shadow DOM not found');
        }
        
      } catch (err) {
        console.error('Error loading Tailwind styles:', err);
        setError(err.message);
        setLoadingState('error');
      }
    };
    
    // Load styles when component mounts
    loadTailwindStyles();
  }, []);

  /**
   * Inject Tailwind CSS into Shadow DOM
   */
  const injectTailwindStyles = (shadowRoot, cssContent) => {
    // Check if styles are already injected
    const existingStyle = shadowRoot.querySelector('#tailwind-styles');
    if (existingStyle) {
      existingStyle.remove();
    }
    
    // Create and inject new style element
    const styleElement = document.createElement('style');
    styleElement.id = 'tailwind-styles';
    styleElement.textContent = cssContent;
    
    // Insert at the beginning of shadow root to ensure proper cascade
    shadowRoot.insertBefore(styleElement, shadowRoot.firstChild);
  };

  // Return loading indicator (optional visual feedback)
  if (loadingState === 'loading') {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '8px 12px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999999
      }}>
        Loading Tailwind CSS...
      </div>
    );
  }

  if (loadingState === 'error') {
    return (
      <div style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        padding: '8px 12px',
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
        zIndex: 9999999
      }}>
        Tailwind CSS Error: {error}
      </div>
    );
  }

  // Return null when loaded (no visual indicator needed)
  return null;
}

/**
 * Hook to check if Tailwind CSS is loaded
 */
export function useTailwindLoaded() {
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    const checkTailwindLoaded = () => {
      const shadowRoot = document.querySelector('shadow-plugin-panel')?.shadowRoot;
      const tailwindStyles = shadowRoot?.querySelector('#tailwind-styles');
      setIsLoaded(!!tailwindStyles);
    };
    
    // Check initially
    checkTailwindLoaded();
    
    // Check periodically until loaded
    const interval = setInterval(() => {
      checkTailwindLoaded();
      if (isLoaded) {
        clearInterval(interval);
      }
    }, 100);
    
    return () => clearInterval(interval);
  }, [isLoaded]);
  
  return isLoaded;
}

/**
 * Utility function to manually reload Tailwind styles
 */
export const reloadTailwindStyles = async () => {
  const shadowRoot = document.querySelector('shadow-plugin-panel')?.shadowRoot;
  if (!shadowRoot) return;
  
  try {
    const apiUrl = window.shadowPluginData?.apiUrl || '/wp-json/shadow-plugin/v1/';
    const tailwindUrl = `${apiUrl}tailwind-styles`;
    const cacheBust = Date.now();
    
    const response = await fetch(`${tailwindUrl}?cache_bust=${cacheBust}`);
    const data = await response.json();
    
    if (data.success) {
      // Remove existing styles
      const existingStyle = shadowRoot.querySelector('#tailwind-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      // Inject new styles
      const styleElement = document.createElement('style');
      styleElement.id = 'tailwind-styles';
      styleElement.textContent = data.css;
      shadowRoot.insertBefore(styleElement, shadowRoot.firstChild);
      
      console.log('Tailwind styles reloaded successfully');
    }
  } catch (err) {
    console.error('Error reloading Tailwind styles:', err);
  }
};
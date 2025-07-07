import React from 'react';
import { useThemeConfig } from '../hooks/useThemeConfig.js';

/**
 * Theme-aware UI Components
 * These components automatically apply styles from the JSON theme config
 */

// Hook to get component styles from JSON config
const useComponentStyles = (componentName) => {
  const { getComponentStyles } = useThemeConfig();
  return getComponentStyles(componentName);
};

/* ===========================================
   MAIN HEADER COMPONENTS
   Top header spanning entire app width
=========================================== */

export const MainHeader = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('main-header');
  return (
    <header 
      className={`main-header ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </header>
  );
};

export const HeaderBrand = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('header-brand');
  return (
    <div 
      className={`header-brand ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const HeaderLogo = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('header-logo');
  return (
    <div 
      className={`header-logo ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const HeaderTitle = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('header-title');
  return (
    <h1 
      className={`header-title ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </h1>
  );
};

export const HeaderSubtitle = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('header-subtitle');
  return (
    <p 
      className={`header-subtitle ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </p>
  );
};

/* ===========================================
   SIDEBAR CONTAINER COMPONENTS
   Main sidebar structure
=========================================== */

export const Sidebar = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar');
  return (
    <aside 
      className={`sidebar ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </aside>
  );
};

/* ===========================================
   SIDEBAR HEADER COMPONENTS
   Top section of sidebar with logo/title
=========================================== */

export const SidebarHeader = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-header');
  return (
    <div 
      className={`sidebar-header ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarHeaderContent = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-header-content');
  return (
    <div 
      className={`sidebar-header-content ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarLogo = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-logo');
  return (
    <div 
      className={`sidebar-logo ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarHeaderText = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-header-text');
  return (
    <div 
      className={`sidebar-header-text ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarTitle = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-title');
  return (
    <h1 
      className={`sidebar-title ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </h1>
  );
};

export const SidebarSubtitle = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-subtitle');
  return (
    <p 
      className={`sidebar-subtitle ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </p>
  );
};

/* ===========================================
   SIDEBAR NAVIGATION COMPONENTS
   4-square navigation grid (1,2,3,4 buttons)
=========================================== */

export const SidebarNavGrid = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-nav-grid');
  return (
    <div 
      className={`sidebar-nav-grid ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarNavButton = ({ children, active = false, className = '', ...props }) => {
  const baseStyles = useComponentStyles('sidebar-nav-button');
  const activeStyles = useComponentStyles('sidebar-nav-button-active');
  const styles = active ? { ...baseStyles, ...activeStyles } : baseStyles;
  
  return (
    <button 
      className={`sidebar-nav-button ${active ? 'sidebar-nav-button-active' : ''} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
};

export const SidebarNavNumber = ({ children, active = false, className = '', ...props }) => {
  const baseStyles = useComponentStyles('sidebar-nav-number');
  const activeStyles = useComponentStyles('sidebar-nav-number-active');
  const styles = active ? { ...baseStyles, ...activeStyles } : baseStyles;
  
  return (
    <div 
      className={`sidebar-nav-number ${active ? 'sidebar-nav-number-active' : ''} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarNavLabel = ({ children, active = false, className = '', ...props }) => {
  const baseStyles = useComponentStyles('sidebar-nav-label');
  const activeStyles = useComponentStyles('sidebar-nav-label-active');
  const styles = active ? { ...baseStyles, ...activeStyles } : baseStyles;
  
  return (
    <div 
      className={`sidebar-nav-label ${active ? 'sidebar-nav-label-active' : ''} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};


/* ===========================================
   SIDEBAR CONTENT AREA COMPONENTS
   Main scrollable content area
=========================================== */

export const SidebarContent = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-content');
  return (
    <div 
      className={`sidebar-content ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const ContentArea = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('content-area');
  return (
    <div 
      className={`content-area ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const SidebarSection = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-section');
  return (
    <div 
      className={`sidebar-section ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const Section = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('section');
  return (
    <div 
      className={`section ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

/* ===========================================
   ACCORDION COMPONENTS
   Collapsible sections for Theme tab content
=========================================== */

export const Accordion = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('accordion');
  return (
    <div 
      className={`accordion ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const AccordionItem = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('accordion-item');
  return (
    <div 
      className={`accordion-item ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const AccordionTrigger = ({ children, isOpen = false, className = '', ...props }) => {
  const styles = useComponentStyles('accordion-trigger');
  return (
    <button 
      className={`accordion-trigger ${isOpen ? 'accordion-trigger-open' : ''} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
};

export const AccordionContent = ({ children, isOpen = false, className = '', ...props }) => {
  const styles = useComponentStyles('accordion-content');
  return (
    <div 
      className={`accordion-content ${isOpen ? 'accordion-content-open' : ''} ${className}`}
      style={{
        ...styles,
        display: isOpen ? 'block' : 'none'
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export const AccordionIcon = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('accordion-icon');
  return (
    <div 
      className={`accordion-icon ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

/* ===========================================
   SIDEBAR FOOTER COMPONENTS
   Bottom section with action buttons
=========================================== */

export const SidebarFooter = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('sidebar-footer');
  return (
    <div 
      className={`sidebar-footer ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

/* ===========================================
   BUTTON COMPONENTS
   Primary and secondary action buttons
=========================================== */

export const ButtonPrimary = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('button-primary');
  return (
    <button 
      className={`button-primary ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
};

export const ButtonSecondary = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('button-secondary');
  return (
    <button 
      className={`button-secondary ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
};

/* ===========================================
   PREVIEW AREA COMPONENTS
   Right side preview/code display area
=========================================== */

export const PreviewContainer = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('preview-container');
  return (
    <div 
      className={`preview-container ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const PreviewHeader = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('preview-header');
  return (
    <div 
      className={`preview-header ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const PreviewContent = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('preview-content');
  return (
    <div 
      className={`preview-content ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const PreviewCanvas = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('preview-canvas');
  return (
    <div 
      className={`preview-canvas ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

/* ===========================================
   PREVIEW MODE TOGGLE COMPONENTS
   Preview/HTML/CSS toggle buttons
=========================================== */

export const PreviewModeToggle = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('preview-mode-toggle');
  return (
    <div 
      className={`preview-mode-toggle ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const PreviewModeButton = ({ children, active = false, className = '', ...props }) => {
  const baseStyles = useComponentStyles('preview-mode-button');
  const activeStyles = useComponentStyles('preview-mode-button-active');
  const styles = active ? { ...baseStyles, ...activeStyles } : baseStyles;
  
  return (
    <button 
      className={`preview-mode-button ${active ? 'preview-mode-button-active' : ''} ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </button>
  );
};

/* ===========================================
   FORM COMPONENTS
   Input fields and labels
=========================================== */

export const Input = ({ className = '', ...props }) => {
  const styles = useComponentStyles('input');
  return (
    <input 
      className={`input ${className}`}
      style={styles}
      {...props}
    />
  );
};

export const Label = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('label');
  return (
    <label 
      className={`label ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </label>
  );
};

/* ===========================================
   CARD COMPONENTS
   Content containers
=========================================== */

export const Card = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('card');
  return (
    <div 
      className={`card ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

/* ===========================================
   COLOR PREVIEW COMPONENTS
   Color grid system for brand colors
=========================================== */

export const ColorGrid = ({ children, className = '', ...props }) => {
  const baseStyles = useComponentStyles('color-grid');
  const xsStyles = useComponentStyles('color-grid-xs') || {};
  const smStyles = useComponentStyles('color-grid-sm') || {};
  const mdStyles = useComponentStyles('color-grid-md') || {};
  const lgStyles = useComponentStyles('color-grid-lg') || {};
  const xlStyles = useComponentStyles('color-grid-xl') || {};
  
  // Apply responsive styles using CSS custom properties
  React.useEffect(() => {
    const shadowRoot = document.querySelector('studio4-builder')?.shadowRoot;
    if (shadowRoot && baseStyles) {
      // Remove existing style if any
      const existingStyle = shadowRoot.querySelector('#color-grid-responsive');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      const style = document.createElement('style');
      style.id = 'color-grid-responsive';
      style.innerHTML = `
        /* Base: Mobile (all screens) */
        .color-grid {
          display: ${baseStyles.display || 'grid'} !important;
          grid-template-columns: ${baseStyles.gridTemplateColumns || 'repeat(1, minmax(0, 1fr))'} !important;
          gap: ${baseStyles.gap || '1rem'} !important;
          width: ${baseStyles.width || '100%'} !important;
        }
        
        /* Extra small screens: 480px+ */
        @media (min-width: 480px) {
          .color-grid {
            grid-template-columns: ${xsStyles.gridTemplateColumns || baseStyles.gridTemplateColumns || 'repeat(1, minmax(0, 1fr))'} !important;
            gap: ${xsStyles.gap || baseStyles.gap || '1rem'} !important;
          }
        }
        
        /* Small screens: 640px+ */
        @media (min-width: 640px) {
          .color-grid {
            grid-template-columns: ${smStyles.gridTemplateColumns || 'repeat(2, minmax(0, 1fr))'} !important;
            gap: ${smStyles.gap || '1rem'} !important;
          }
        }
        
        /* Medium screens: 768px+ */
        @media (min-width: 768px) {
          .color-grid {
            grid-template-columns: ${mdStyles.gridTemplateColumns || 'repeat(2, minmax(0, 1fr))'} !important;
            gap: ${mdStyles.gap || '1.25rem'} !important;
          }
        }
        
        /* Large screens: 1024px+ */
        @media (min-width: 1024px) {
          .color-grid {
            grid-template-columns: ${lgStyles.gridTemplateColumns || 'repeat(3, minmax(0, 1fr))'} !important;
            gap: ${lgStyles.gap || '1.5rem'} !important;
          }
        }
        
        /* Extra large screens: 1280px+ */
        @media (min-width: 1280px) {
          .color-grid {
            grid-template-columns: ${xlStyles.gridTemplateColumns || 'repeat(4, minmax(0, 1fr))'} !important;
            gap: ${xlStyles.gap || '1.75rem'} !important;
          }
        }
      `;
      shadowRoot.appendChild(style);
    }
  }, [baseStyles, xsStyles, smStyles, mdStyles, lgStyles, xlStyles]);
  
  return (
    <div 
      className={`color-grid ${className}`}
      style={baseStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export const ColorCard = ({ children, className = '', ...props }) => {
  const baseStyles = useComponentStyles('color-card');
  const hoverStyles = useComponentStyles('color-card-hover');
  
  // Apply hover styles using CSS-in-JS
  React.useEffect(() => {
    const shadowRoot = document.querySelector('studio4-builder')?.shadowRoot;
    if (shadowRoot && hoverStyles) {
      // Remove existing hover style if any
      const existingStyle = shadowRoot.querySelector('#color-card-hover-styles');
      if (existingStyle) {
        existingStyle.remove();
      }
      
      const style = document.createElement('style');
      style.id = 'color-card-hover-styles';
      style.innerHTML = `
        .color-card:hover {
          box-shadow: ${hoverStyles.boxShadow} !important;
          transform: ${hoverStyles.transform} !important;
        }
      `;
      shadowRoot.appendChild(style);
    }
  }, [hoverStyles]);
  
  return (
    <div 
      className={`color-card ${className}`}
      style={baseStyles}
      {...props}
    >
      {children}
    </div>
  );
};

export const ColorSwatch = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-swatch');
  return (
    <div 
      className={`color-swatch ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const ColorSwatchNumber = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-swatch-number');
  return (
    <span 
      className={`color-swatch-number ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </span>
  );
};

export const ColorSwatchLabel = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-swatch-label');
  return (
    <span 
      className={`color-swatch-label ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </span>
  );
};

export const ColorCardContent = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-card-content');
  return (
    <div 
      className={`color-card-content ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const ColorCardTitle = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-card-title');
  return (
    <h3 
      className={`color-card-title ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </h3>
  );
};

export const ColorCardValue = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-card-value');
  return (
    <p 
      className={`color-card-value ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </p>
  );
};

export const ColorScale = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-scale');
  return (
    <div 
      className={`color-scale ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </div>
  );
};

export const ColorScaleSwatch = ({ className = '', ...props }) => {
  const styles = useComponentStyles('color-scale-swatch');
  return (
    <div 
      className={`color-scale-swatch ${className}`}
      style={styles}
      {...props}
    />
  );
};

export const ColorPreviewTitle = ({ children, className = '', ...props }) => {
  const styles = useComponentStyles('color-preview-title');
  return (
    <h2 
      className={`color-preview-title ${className}`}
      style={styles}
      {...props}
    >
      {children}
    </h2>
  );
};

// Export all components for easy access
export default {
  // Main Header Components
  MainHeader,
  HeaderBrand,
  HeaderLogo,
  HeaderTitle,
  HeaderSubtitle,
  
  // Sidebar Container
  Sidebar,
  
  // Sidebar Header Components
  SidebarHeader,
  SidebarHeaderContent,
  SidebarLogo,
  SidebarHeaderText,
  SidebarTitle,
  SidebarSubtitle,
  
  // Sidebar Navigation (4-square grid)
  SidebarNavGrid,
  SidebarNavButton,
  SidebarNavNumber,
  SidebarNavLabel,
  
  
  // Sidebar Content Area
  SidebarContent,
  ContentArea,
  SidebarSection,
  Section,
  
  // Accordion Components
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
  AccordionIcon,
  
  // Sidebar Footer
  SidebarFooter,
  
  // Button Components
  ButtonPrimary,
  ButtonSecondary,
  
  // Preview Area Components
  PreviewContainer,
  PreviewHeader,
  PreviewContent,
  PreviewCanvas,
  
  // Preview Mode Toggle
  PreviewModeToggle,
  PreviewModeButton,
  
  // Form Components
  Input,
  Label,
  
  // Card Components
  Card,
  
  // Color Preview Components
  ColorGrid,
  ColorCard,
  ColorSwatch,
  ColorSwatchNumber,
  ColorSwatchLabel,
  ColorCardContent,
  ColorCardTitle,
  ColorCardValue,
  ColorScale,
  ColorScaleSwatch,
  ColorPreviewTitle
};
import React, { useState, useEffect } from 'react';
import { useStore } from '../../storage/store';
import { S4PresetProcessor } from '../utils/S4PresetProcessor';
import presetData from '../presets/s4-presets.json';
import { ThemeEditor } from '../../components/ThemeEditor.jsx';
import { useThemeConfig } from '../../hooks/useThemeConfig.js';
import {
  Sidebar,
  SidebarHeader,
  SidebarHeaderContent,
  SidebarLogo,
  SidebarHeaderText,
  SidebarTitle,
  SidebarSubtitle,
  SidebarNavGrid,
  SidebarNavButton,
  SidebarNavNumber,
  SidebarNavLabel,
  ContentArea,
  Section,
  ButtonPrimary,
  ButtonSecondary,
  SidebarFooter,
  PreviewContainer,
  PreviewHeader,
  PreviewContent,
  PreviewCanvas,
  PreviewModeToggle,
  PreviewModeButton,
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
  ColorPreviewTitle,
  MainHeader,
  HeaderBrand,
  HeaderLogo,
  HeaderTitle,
  HeaderSubtitle
} from '../../components/UIComponents.jsx';

export function S4ThemeBuilder() {
  // Get S4 state from Zustand store
  const {
    s4BrandColors,
    s4ActiveColorPreset,
    updateS4BrandColor,
    setS4ActiveColorPreset,
  } = useStore();
  
  // State
  const [activeTab, setActiveTab] = useState('theme');
  const [expandedSection, setExpandedSection] = useState('colors');
  const [selectedColor, setSelectedColor] = useState('color1');
  const [generatedCSS, setGeneratedCSS] = useState('');
  const [previewMode, setPreviewMode] = useState('preview'); // 'preview', 'html', 'css'
  const [isThemeEditorOpen, setIsThemeEditorOpen] = useState(false);
  
  // Theme configuration hook
  const { config: themeConfig, getComponentStyles } = useThemeConfig();
  
  // Toggle fullscreen function
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      // Shift + F for fullscreen toggle
      if (e.shiftKey && e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      }
    };
    
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
  
  // Generate CSS whenever settings change
  useEffect(() => {
    const css = `/* Studio4 Generated CSS Variables */
:root {
  /* Layer 1: Brand Colors */
  --color1: ${s4BrandColors.color1};
  --color2: ${s4BrandColors.color2};
  --color3: ${s4BrandColors.color3};
  --color4: ${s4BrandColors.color4};
  
  /* Color Scales (50-950) */
  --color1-50: hsl(from ${s4BrandColors.color1} h s 95%);
  --color1-100: hsl(from ${s4BrandColors.color1} h s 90%);
  --color1-200: hsl(from ${s4BrandColors.color1} h s 80%);
  --color1-300: hsl(from ${s4BrandColors.color1} h s 70%);
  --color1-400: hsl(from ${s4BrandColors.color1} h s 60%);
  --color1-500: ${s4BrandColors.color1};
  --color1-600: hsl(from ${s4BrandColors.color1} h s 40%);
  --color1-700: hsl(from ${s4BrandColors.color1} h s 30%);
  --color1-800: hsl(from ${s4BrandColors.color1} h s 20%);
  --color1-900: hsl(from ${s4BrandColors.color1} h s 10%);
  --color1-950: hsl(from ${s4BrandColors.color1} h s 5%);
  
  /* Layer 2: Global Elements (placeholders) */
  --section-bg: transparent;
  --section-padding: 4rem 2rem;
  --container-max-width: 1280px;
  --wrapper-bg: transparent;
  --wrapper-padding: 2rem;
  --title-color: var(--color3);
  --title-font-size: 2.5rem;
  --text-color: var(--color3);
  --text-font-size: 1rem;
  --button-primary-bg: var(--color1);
  --button-primary-color: white;
  --button-secondary-bg: transparent;
  --button-secondary-color: var(--color1);
  --button-secondary-border: 2px solid var(--color1);
}

/* Layer 3: Color Presets */
[data-preset="default-colors"] .section { --section-bg: var(--color4); }
[data-preset="default-colors"] .wrapper { --wrapper-bg: white; }
[data-preset="default-colors"] .title { --title-color: var(--color3); }
[data-preset="default-colors"] .text { --text-color: var(--color3); }

/* Layer 4: Helper Presets */
[data-helper="dark-mode"] .section { --section-bg: var(--color3); }
[data-helper="dark-mode"] .title { --title-color: var(--color4); }
[data-helper="dark-mode"] .text { --text-color: var(--color4); }`;
    setGeneratedCSS(css);
  }, [s4BrandColors]);
  
  // Helper to parse HSL
  const parseHSL = (hslString) => {
    const match = hslString.match(/hsl\((\d+),?\s*(\d+)%,?\s*(\d+)%\)/);
    if (match) {
      return {
        h: parseInt(match[1]),
        s: parseInt(match[2]),
        l: parseInt(match[3])
      };
    }
    // Handle hex colors
    if (hslString.startsWith('#')) {
      return hexToHSL(hslString);
    }
    return { h: 0, s: 0, l: 50 };
  };
  
  // Helper to convert hex to HSL
  const hexToHSL = (hex) => {
    hex = hex.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16) / 255;
    const g = parseInt(hex.substr(2, 2), 16) / 255;
    const b = parseInt(hex.substr(4, 2), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    
    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };
  
  // Get HSL values for selected color
  const currentColorHSL = parseHSL(s4BrandColors[selectedColor]);
  
  // Update color
  const updateSelectedColor = (h, s, l) => {
    const newColor = `hsl(${h}, ${s}%, ${l}%)`;
    updateS4BrandColor(selectedColor, newColor);
  };
  
  return (
    <div className="flex flex-col h-full bg-neutral-950 text-neutral-50">
      {/* Top Header */}
      <MainHeader>
        <HeaderBrand>
          <HeaderLogo>
          <svg width="40" height="40" viewBox="0 0 103 104" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="3.5" y="3.49963" width="95.6918" height="96.1796" rx="15.22" stroke="url(#paint0_linear_s4_logo)" strokeWidth="7"/>
            <path d="M13.9529 17.8661V22.3476C13.9529 23.343 15.1542 23.8438 15.8612 23.1432L22.5479 16.5173C23.2585 15.8132 22.7599 14.6017 21.7596 14.6017H17.2788C16.9873 14.6017 16.7072 14.7154 16.4982 14.9186L14.2922 17.0631C14.0753 17.2739 13.9529 17.5636 13.9529 17.8661Z" fill="hsl(337, 35%, 52%)" fillOpacity="0.7"/>
            <path d="M88.4811 17.8661V22.3476C88.4811 23.343 87.2798 23.8438 86.5727 23.1432L79.886 16.5173C79.1755 15.8132 79.6741 14.6017 80.6744 14.6017H85.1551C85.4467 14.6017 85.7268 14.7154 85.9358 14.9186L88.1418 17.0631C88.3587 17.2739 88.4811 17.5636 88.4811 17.8661Z" fill="hsl(29, 44%, 53%)" fillOpacity="0.7"/>
            <path d="M17.2173 88.1299H21.6988C22.6942 88.1299 23.195 86.9286 22.4944 86.2215L15.8684 79.5348C15.1644 78.8243 13.9529 79.3229 13.9529 80.3232V84.8039C13.9529 85.0955 14.0666 85.3756 14.2698 85.5846L16.4143 87.7906C16.6251 88.0075 16.9148 88.1299 17.2173 88.1299Z" fill="hsl(29, 44%, 53%)" fillOpacity="0.7"/>
            <path d="M85.2166 88.1299H80.7351C79.7398 88.1299 79.239 86.9286 79.9396 86.2215L86.5655 79.5348C87.2696 78.8243 88.4811 79.3229 88.4811 80.3232V84.8039C88.4811 85.0955 88.3674 85.3756 88.1642 85.5846L86.0197 87.7906C85.8088 88.0075 85.5192 88.1299 85.2166 88.1299Z" fill="hsl(337, 35%, 52%)" fillOpacity="0.7"/>
            <path d="M66.2096 37.8214C65.8459 35.156 64.3459 33.0913 61.7096 31.6272C59.0732 30.1444 55.755 29.4029 51.755 29.4029C48.8914 29.4029 46.4141 29.7784 44.3232 30.5292C42.2323 31.2612 40.6073 32.2748 39.4482 33.57C38.3118 34.8463 37.7437 36.301 37.7437 37.9341C37.7437 39.3043 38.13 40.4868 38.9027 41.4816C39.6982 42.4765 40.7323 43.3117 42.005 43.9875C43.3005 44.6444 44.6868 45.1982 46.1641 45.6486C47.6414 46.0804 49.0618 46.437 50.4255 46.7186L57.2437 48.1826C59.4709 48.6331 61.755 49.2432 64.0959 50.0127C66.4368 50.7823 68.6073 51.7959 70.6073 53.0535C72.6073 54.3111 74.2209 55.8691 75.4482 57.7273C76.6982 59.5856 77.3232 61.8099 77.3232 64.4002C77.3232 67.6662 76.3005 70.5662 74.255 73.1002C72.2323 75.6342 69.2891 77.6332 65.4255 79.0973C61.5846 80.5614 56.9368 81.2935 51.4823 81.2935C46.255 81.2935 41.7323 80.6083 37.9141 79.2381C34.0959 77.8679 31.1073 75.9251 28.9482 73.4099C26.7891 70.8759 25.5959 67.8727 25.3687 64.4002H35.9368C36.1414 66.4837 36.9596 68.2199 38.3914 69.6089C39.8459 70.9792 41.6982 72.0022 43.9482 72.6779C46.2209 73.3348 48.7096 73.6633 51.4141 73.6633C54.3914 73.6633 57.0391 73.2785 59.3573 72.5089C61.6982 71.7206 63.5391 70.6319 64.88 69.2429C66.2209 67.8351 66.8914 66.1927 66.8914 64.3157C66.8914 62.6076 66.3005 61.2092 65.1187 60.1205C63.9596 59.0319 62.38 58.1309 60.38 57.4176C58.4027 56.7044 56.1641 56.0756 53.6641 55.5312L45.4141 53.673C39.8232 52.4153 35.3914 50.5665 32.1187 48.1263C28.8687 45.6862 27.2437 42.4577 27.2437 38.4408C27.2437 35.1185 28.3346 32.2185 30.5164 29.7408C32.6982 27.2631 35.6527 25.3392 39.38 23.9689C43.1073 22.5799 47.3118 21.8854 51.9937 21.8854C56.7209 21.8854 60.8914 22.5706 64.505 23.9408C68.1414 25.311 71.005 27.1974 73.0959 29.6C75.1868 31.9839 76.2777 34.7243 76.3687 37.8214H66.2096Z" fill="url(#paint1_linear_s4_logo)"/>
            <defs>
              <linearGradient id="paint0_linear_s4_logo" x1="1.23267e-06" y1="8.7248" x2="99.6891" y2="102.708" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(337, 35%, 52%)"/>
                <stop offset="1" stopColor="hsl(29, 44%, 53%)"/>
              </linearGradient>
              <linearGradient id="paint1_linear_s4_logo" x1="25.3687" y1="26.9091" x2="81.8625" y2="73.7083" gradientUnits="userSpaceOnUse">
                <stop stopColor="hsl(337, 35%, 52%)"/>
                <stop offset="1" stopColor="hsl(29, 44%, 53%)"/>
              </linearGradient>
            </defs>
          </svg>
          </HeaderLogo>
          <div>
            <HeaderTitle>Studio4</HeaderTitle>
            <HeaderSubtitle>Visual Theme Builder</HeaderSubtitle>
          </div>
        </HeaderBrand>
      </MainHeader>
      
      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <Sidebar className="w-[400px] bg-neutral-900 border-r-[6px] border-neutral-800 flex flex-col">
          {/* 4-Square Navigation Grid in Sidebar Header */}
          <SidebarNavGrid>
            <SidebarNavButton
              active={activeTab === 'theme'}
              onClick={() => setActiveTab('theme')}
            >
              <SidebarNavNumber active={activeTab === 'theme'}>1</SidebarNavNumber>
              <SidebarNavLabel active={activeTab === 'theme'}>Theme</SidebarNavLabel>
            </SidebarNavButton>
            
            <SidebarNavButton
              active={activeTab === 'presets'}
              onClick={() => setActiveTab('presets')}
            >
              <SidebarNavNumber active={activeTab === 'presets'}>2</SidebarNavNumber>
              <SidebarNavLabel active={activeTab === 'presets'}>Presets</SidebarNavLabel>
            </SidebarNavButton>
            
            <SidebarNavButton
              active={activeTab === 'components'}
              onClick={() => setActiveTab('components')}
            >
              <SidebarNavNumber active={activeTab === 'components'}>3</SidebarNavNumber>
              <SidebarNavLabel active={activeTab === 'components'}>Components</SidebarNavLabel>
            </SidebarNavButton>
            
            <SidebarNavButton
              active={activeTab === 'sections'}
              onClick={() => setActiveTab('sections')}
            >
              <SidebarNavNumber active={activeTab === 'sections'}>4</SidebarNavNumber>
              <SidebarNavLabel active={activeTab === 'sections'}>Sections</SidebarNavLabel>
            </SidebarNavButton>
          </SidebarNavGrid>
        
        {/* Accordion Sections */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'theme' && (
            <>
              {/* Colors Section */}
              <div className="border-b border-neutral-700">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'colors' ? null : 'colors')}
                  className={`w-full py-3 flex items-center justify-between transition-colors relative bg-neutral-800 hover:bg-neutral-700 ${
                    expandedSection === 'colors' 
                      ? 'border-l-4 border-b-4 border-l-primary-500 border-b-primary-500' 
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3 px-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all ${
                      expandedSection === 'colors'
                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-bold animate-pulse'
                        : 'bg-transparent text-primary-500 font-semibold'
                    }`}>
                      1
                    </div>
                    <span className="font-medium">Colors</span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform mr-6 ${expandedSection === 'colors' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'colors' && (
                  <>
                    <div className="px-6 py-4 space-y-4 bg-neutral-800/20">
                    {/* Color Selector */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-50">Brand Color Selection</label>
                      <select
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="w-full px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-md text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-colors"
                      >
                        <option value="color1">Color 1 - Primary Brand</option>
                        <option value="color2">Color 2 - Secondary Brand</option>
                        <option value="color3">Color 3 - Dark Neutral</option>
                        <option value="color4">Color 4 - Light Base</option>
                      </select>
                    </div>
                    
                    {/* Base Color Display */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-neutral-50">Current Color</label>
                      <div className="flex gap-2">
                        <div 
                          className="flex-1 h-16 rounded-lg border-2 border-neutral-700 shadow-inner"
                          style={{ backgroundColor: s4BrandColors[selectedColor] }}
                        />
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="font-mono bg-neutral-800 px-2 py-1 rounded">
                            {s4BrandColors[selectedColor]}
                          </span>
                          <span className="font-mono bg-neutral-800 px-2 py-1 rounded">
                            HSL({currentColorHSL.h}, {currentColorHSL.s}%, {currentColorHSL.l}%)
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* HSL Sliders */}
                    <div className="space-y-4 bg-neutral-900/50 p-4 rounded-lg border border-neutral-700">
                      <h4 className="text-sm font-medium">Color Adjustments</h4>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">Hue</span>
                          <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded">{currentColorHSL.h}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="360"
                          value={currentColorHSL.h}
                          onChange={(e) => updateSelectedColor(e.target.value, currentColorHSL.s, currentColorHSL.l)}
                          className="w-full accent-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">Saturation</span>
                          <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded">{currentColorHSL.s}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentColorHSL.s}
                          onChange={(e) => updateSelectedColor(currentColorHSL.h, e.target.value, currentColorHSL.l)}
                          className="w-full accent-primary"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="font-medium">Lightness</span>
                          <span className="font-mono bg-neutral-800 px-2 py-0.5 rounded">{currentColorHSL.l}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={currentColorHSL.l}
                          onChange={(e) => updateSelectedColor(currentColorHSL.h, currentColorHSL.s, e.target.value)}
                          className="w-full accent-primary"
                        />
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <button className="button-primary flex-1 px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg text-sm font-medium hover:opacity-90 shadow-lg transition-all">
                        Apply to Theme
                      </button>
                      <button className="button-secondary px-4 py-2.5 bg-neutral-700 text-neutral-200 rounded-lg text-sm font-medium hover:bg-neutral-600 border border-neutral-600">
                        Reset
                      </button>
                    </div>
                  </div>
                  </>
                )}
              </div>
              
              {/* Typography Section */}
              <div className="border-b border-neutral-700">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'typography' ? null : 'typography')}
                  className={`w-full py-3 flex items-center justify-between transition-colors relative bg-neutral-800 hover:bg-neutral-700 ${
                    expandedSection === 'typography' 
                      ? 'border-l-4 border-b-4 border-l-primary-500 border-b-primary-500' 
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3 px-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-lg transition-all ${
                      expandedSection === 'typography'
                        ? 'bg-gradient-to-br from-primary-500 to-secondary-500 text-white font-bold animate-pulse'
                        : 'bg-transparent text-primary-500 font-semibold'
                    }`}>
                      2
                    </div>
                    <span className="font-medium">Typography</span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform mr-6 ${expandedSection === 'typography' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'typography' && (
                  <div className="px-6 py-4 space-y-4 bg-neutral-800/20">
                    <p className="text-sm text-neutral-400">Typography controls coming soon...</p>
                  </div>
                )}
              </div>
              
              {/* Elements Section */}
              <div className="border-b border-neutral-700">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'elements' ? null : 'elements')}
                  className={`w-full py-3 flex items-center justify-between transition-colors relative bg-neutral-800 hover:bg-neutral-700 ${
                    expandedSection === 'elements' 
                      ? 'border-l-4 border-b-4 border-l-primary-500 border-b-primary-500' 
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3 px-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      expandedSection === 'elements'
                        ? 'bg-primary-500 text-white'
                        : 'bg-secondary-500 text-white'
                    }`}>
                      3
                    </div>
                    <span className="font-medium">Elements</span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform mr-6 ${expandedSection === 'elements' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'elements' && (
                  <div className="px-6 py-4 space-y-4 bg-neutral-800/20">
                    <p className="text-sm text-neutral-400">Global elements configuration coming soon...</p>
                  </div>
                )}
              </div>
              
              {/* Layouts Section */}
              <div className="border-b border-neutral-700">
                <button
                  onClick={() => setExpandedSection(expandedSection === 'layouts' ? null : 'layouts')}
                  className={`w-full py-3 flex items-center justify-between transition-colors relative bg-neutral-800 hover:bg-neutral-700 ${
                    expandedSection === 'layouts' 
                      ? 'border-l-4 border-b-4 border-l-primary-500 border-b-primary-500' 
                      : ''
                  }`}
                >
                  <div className="flex items-center gap-3 px-6">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                      expandedSection === 'layouts'
                        ? 'bg-primary-500 text-white'
                        : 'bg-secondary-500 text-white'
                    }`}>
                      4
                    </div>
                    <span className="font-medium">Layouts</span>
                  </div>
                  <svg 
                    className={`w-4 h-4 transition-transform mr-6 ${expandedSection === 'layouts' ? 'rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {expandedSection === 'layouts' && (
                  <div className="px-6 py-4 space-y-4 bg-neutral-800/20">
                    <p className="text-sm text-neutral-400">Component layout transformations coming soon...</p>
                  </div>
                )}
              </div>
            </>
          )}
          
          {activeTab === 'presets' && (
            <div className="px-6 py-4">
              <p className="text-sm text-neutral-400">Color presets and theme variations will appear here...</p>
            </div>
          )}
          
          {activeTab === 'components' && (
            <div className="px-6 py-4">
              <p className="text-sm text-neutral-400">Component scopes will appear here...</p>
            </div>
          )}
          
          {activeTab === 'sections' && (
            <div className="px-6 py-4">
              <p className="text-sm text-neutral-400">Section layouts and templates will appear here...</p>
            </div>
          )}
        </div>
        
        <SidebarFooter>
          {/* Dev-only Theme Editor - Hidden from regular users */}
          {(window.location.hostname === 'localhost' || window.location.search.includes('dev=true')) && (
            <ButtonSecondary 
              onClick={() => setIsThemeEditorOpen(true)}
              className="w-full flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
              </svg>
              UI Theme Editor
            </ButtonSecondary>
          )}
          <ButtonPrimary className="w-full">
            Export Theme
          </ButtonPrimary>
        </SidebarFooter>
        </Sidebar>
        
        {/* Main Preview Area */}
        <PreviewContainer>
        {/* Preview Mode Toggle */}
        <PreviewHeader>
          <PreviewModeToggle>
            <PreviewModeButton
              onClick={() => setPreviewMode('preview')}
              active={previewMode === 'preview'}
            >
              Preview
            </PreviewModeButton>
            <PreviewModeButton
              onClick={() => setPreviewMode('html')}
              active={previewMode === 'html'}
            >
              HTML
            </PreviewModeButton>
            <PreviewModeButton
              onClick={() => setPreviewMode('css')}
              active={previewMode === 'css'}
            >
              CSS
            </PreviewModeButton>
          </PreviewModeToggle>
          
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-neutral-700 rounded-md transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </button>
            <button className="p-2 hover:bg-neutral-700 rounded-md transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </PreviewHeader>
        
        {/* Preview Content */}
        <PreviewContent>
          <PreviewCanvas>
          <style dangerouslySetInnerHTML={{ __html: generatedCSS }} />
        
        {/* Preview Mode */}
        {previewMode === 'preview' && (
          <>
        {/* Dynamic Preview based on selected section */}
        {expandedSection === 'colors' && (
          <div className="w-full">
            <ColorPreviewTitle>Color System Preview</ColorPreviewTitle>
            
            {/* 4 Color Grid - Responsive */}
            <ColorGrid>
              {Object.entries(s4BrandColors).map(([key, color], index) => (
                <ColorCard key={key}>
                  <ColorSwatch 
                    style={{ 
                      backgroundColor: color,
                      color: index < 2 ? 'white' : index === 2 ? 'white' : 'black'
                    }}
                  >
                    <ColorSwatchNumber>{index + 1}</ColorSwatchNumber>
                    <ColorSwatchLabel>
                      {key === 'color1' ? 'Primary' : 
                       key === 'color2' ? 'Secondary' : 
                       key === 'color3' ? 'Dark' : 'Light'}
                    </ColorSwatchLabel>
                  </ColorSwatch>
                  <ColorCardContent>
                    <ColorCardTitle>
                      {key === 'color1' ? 'Primary Brand' : 
                       key === 'color2' ? 'Secondary Brand' : 
                       key === 'color3' ? 'Dark Neutral' : 'Light Base'}
                    </ColorCardTitle>
                    <ColorCardValue>{color}</ColorCardValue>
                    
                    {/* Color Scale */}
                    <ColorScale>
                      {[90, 70, 50, 30, 10].map(lightness => {
                        const hsl = parseHSL(color);
                        return (
                          <ColorScaleSwatch
                            key={lightness}
                            style={{ backgroundColor: `hsl(${hsl.h}, ${hsl.s}%, ${lightness}%)` }}
                          />
                        );
                      })}
                    </ColorScale>
                  </ColorCardContent>
                </ColorCard>
              ))}
            </ColorGrid>
          </div>
        )}
        
        {expandedSection === 'typography' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Typography Preview</h2>
            <p className="text-center text-neutral-400">Typography system preview coming soon...</p>
          </div>
        )}
        
        {expandedSection === 'elements' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Global Elements Preview</h2>
            <p className="text-center text-neutral-400">Elements preview coming soon...</p>
          </div>
        )}
        
        {expandedSection === 'layouts' && (
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 text-center">Layout Transformations</h2>
            <p className="text-center text-neutral-400">Component layout preview coming soon...</p>
          </div>
        )}
        
        {!expandedSection && (
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to Studio4</h2>
            <p className="text-neutral-400">Select a section from the sidebar to begin customizing your theme.</p>
          </div>
        )}
          </>
        )}
        
        {/* HTML Mode */}
        {previewMode === 'html' && (
          <div className="max-w-4xl mx-auto">
            <pre className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 overflow-x-auto">
              <code className="text-sm font-mono">
{`<!-- Studio4 Generated HTML -->
<section class="section" data-scope="default">
  <div class="container">
    <div class="wrapper">
      <h1 class="title">Your Title Here</h1>
      <p class="text">Your content goes here with the S4 design system applied.</p>
      <button class="button-primary">Primary Action</button>
      <button class="button-secondary">Secondary Action</button>
    </div>
  </div>
</section>`}
              </code>
            </pre>
          </div>
        )}
        
        {/* CSS Mode */}
        {previewMode === 'css' && (
          <div className="max-w-4xl mx-auto">
            <pre className="bg-neutral-800 p-6 rounded-lg border border-neutral-700 overflow-x-auto">
              <code className="text-sm font-mono">{generatedCSS}</code>
            </pre>
          </div>
        )}
        
          </PreviewCanvas>
          </PreviewContent>
        </PreviewContainer>
      </div>
      
      {/* Theme Editor Modal */}
      <ThemeEditor 
        isOpen={isThemeEditorOpen} 
        onClose={() => setIsThemeEditorOpen(false)} 
      />
    </div>
  );
}
import React, { useState } from 'react';

export default function LivePreview({ css, brandColors, colorPreset, layoutPreset }) {
  const [deviceView, setDeviceView] = useState('desktop');
  
  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px'
  };
  
  return (
    <div className="h-full">
      {/* CSS Output */}
      <style dangerouslySetInnerHTML={{ __html: css }} />
      
      {/* Preview Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Live Preview</h3>
        <div className="flex gap-2">
          <button 
            onClick={() => setDeviceView('desktop')}
            className={`px-3 py-1 text-sm border border-border rounded-md transition-colors ${
              deviceView === 'desktop' ? 'bg-muted' : 'bg-card hover:bg-muted'
            }`}
          >
            Desktop
          </button>
          <button 
            onClick={() => setDeviceView('tablet')}
            className={`px-3 py-1 text-sm border border-border rounded-md transition-colors ${
              deviceView === 'tablet' ? 'bg-muted' : 'bg-card hover:bg-muted'
            }`}
          >
            Tablet
          </button>
          <button 
            onClick={() => setDeviceView('mobile')}
            className={`px-3 py-1 text-sm border border-border rounded-md transition-colors ${
              deviceView === 'mobile' ? 'bg-muted' : 'bg-card hover:bg-muted'
            }`}
          >
            Mobile
          </button>
        </div>
      </div>
      
      {/* Preview Frame */}
      <div className="flex justify-center">
        <div 
          className="bg-white rounded-lg shadow-2xl overflow-hidden transition-all duration-300"
          style={{ 
            width: deviceWidths[deviceView],
            maxWidth: '100%'
          }}
        >
          {/* Hero Section */}
          <section className="section">
            <div className="container">
              <div className="text-center">
                <h1 className="title">Build Beautiful Themes</h1>
                <p className="subtitle">Visual theme creation for WordPress</p>
                <p className="text">
                  Experience the power of the S4 system. Create consistent, scalable designs 
                  with our intuitive visual builder. Real-time preview shows your changes instantly.
                </p>
                <div className="flex gap-4 justify-center mt-6">
                  <button className="button-primary">Get Started</button>
                  <button className="button-secondary">Learn More</button>
                </div>
              </div>
            </div>
          </section>
          
          {/* Grid Section */}
          <section className="section" style={{ background: 'white' }}>
            <div className="container">
              <h2 className="title text-center">Feature Grid</h2>
              <div className="grid" style={{ gridTemplateColumns: deviceView === 'mobile' ? '1fr' : null }}>
                <div className="p-4 border rounded-lg">
                  <h3 className="subtitle">Color System</h3>
                  <p className="text">Powerful color management with brand tokens and presets.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="subtitle">Layout Control</h3>
                  <p className="text">Flexible spacing and sizing with mathematical precision.</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="subtitle">Live Preview</h3>
                  <p className="text">See your changes instantly across different devices.</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Typography Section */}
          <section className="section">
            <div className="container">
              <h2 className="title">Typography Scale</h2>
              <div className="space-y-2">
                <h1 className="title">Heading Level 1</h1>
                <h2 className="subtitle">Heading Level 2</h2>
                <p className="text">
                  Regular body text demonstrating the type scale and line height. 
                  The S4 system ensures consistent typography across your entire site.
                </p>
                <p className="text" style={{ fontSize: 'var(--text-sm)' }}>
                  Small text for captions and secondary information.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
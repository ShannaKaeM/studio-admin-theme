import { writeFileSync, mkdirSync } from 'fs';

async function buildCSS() {
  try {
    console.log('Building Tailwind CSS...');
    
    // Ensure dist/css directory exists
    mkdirSync('dist/css', { recursive: true });
    
    // Create comprehensive Tailwind CSS for the demo
    const css = `
/* Tailwind CSS Base */
*, ::before, ::after {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}

::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-gradient-from-position: ;
  --tw-gradient-via-position: ;
  --tw-gradient-to-position: ;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgb(59 130 246 / 0.5);
  --tw-ring-offset-shadow: 0 0 #0000;
  --tw-ring-shadow: 0 0 #0000;
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}

/* Tailwind Utilities */

/* Layout */
.fixed { position: fixed; }
.absolute { position: absolute; }
.relative { position: relative; }
.inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
.inset-y-0 { top: 0; bottom: 0; }
.top-0 { top: 0; }
.top-5 { top: 1.25rem; }
.right-0 { right: 0; }
.right-5 { right: 1.25rem; }
.bottom-0 { bottom: 0; }
.left-0 { left: 0; }

/* Flexbox */
.flex { display: flex; }
.flex-1 { flex: 1 1 0%; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }
.flex-shrink-0 { flex-shrink: 0; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-end { justify-content: flex-end; }

/* Grid */
.grid { display: grid; }
.grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
.grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* Spacing */
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.space-x-1 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.25rem; }
.space-x-2 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.5rem; }
.space-x-3 > :not([hidden]) ~ :not([hidden]) { margin-left: 0.75rem; }
.space-x-4 > :not([hidden]) ~ :not([hidden]) { margin-left: 1rem; }
.space-y-1 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.25rem; }
.space-y-3 > :not([hidden]) ~ :not([hidden]) { margin-top: 0.75rem; }
.space-y-4 > :not([hidden]) ~ :not([hidden]) { margin-top: 1rem; }
.space-y-6 > :not([hidden]) ~ :not([hidden]) { margin-top: 1.5rem; }

/* Margin */
.m-0 { margin: 0; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.ml-2 { margin-left: 0.5rem; }

/* Padding */
.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.pl-3 { padding-left: 0.75rem; }
.pl-10 { padding-left: 2.5rem; }
.pr-4 { padding-right: 1rem; }
.pt-4 { padding-top: 1rem; }

/* Sizing */
.w-1.5 { width: 0.375rem; }
.w-2 { width: 0.5rem; }
.w-4 { width: 1rem; }
.w-5 { width: 1.25rem; }
.w-6 { width: 1.5rem; }
.w-8 { width: 2rem; }
.w-11 { width: 2.75rem; }
.w-12 { width: 3rem; }
.w-full { width: 100%; }
.h-1.5 { height: 0.375rem; }
.h-2 { height: 0.5rem; }
.h-4 { height: 1rem; }
.h-5 { height: 1.25rem; }
.h-6 { height: 1.5rem; }
.h-8 { height: 2rem; }
.h-12 { height: 3rem; }
.h-full { height: 100%; }
.max-w-2xl { max-width: 42rem; }
.max-w-90vw { max-width: 90vw; }
.max-h-85vh { max-height: 85vh; }
.min-w-0 { min-width: 0; }

/* Colors - Backgrounds */
.bg-black\/50 { background-color: rgb(0 0 0 / 0.5); }
.bg-white { background-color: rgb(255 255 255); }
.bg-gray-50 { background-color: rgb(249 250 251); }
.bg-gray-100 { background-color: rgb(243 244 246); }
.bg-gray-200 { background-color: rgb(229 231 235); }
.bg-gray-300 { background-color: rgb(209 213 219); }
.bg-gray-700 { background-color: rgb(55 65 81); }
.bg-gray-800 { background-color: rgb(31 41 55); }
.bg-gray-900 { background-color: rgb(17 24 39); }
.bg-red-100 { background-color: rgb(254 226 226); }
.bg-red-500 { background-color: rgb(239 68 68); }
.bg-red-600 { background-color: rgb(220 38 38); }
.bg-green-100 { background-color: rgb(220 252 231); }
.bg-green-500 { background-color: rgb(34 197 94); }
.bg-green-600 { background-color: rgb(22 163 74); }
.bg-yellow-100 { background-color: rgb(254 249 195); }
.bg-yellow-500 { background-color: rgb(234 179 8); }
.bg-blue-50 { background-color: rgb(239 246 255); }
.bg-blue-100 { background-color: rgb(219 234 254); }
.bg-blue-200 { background-color: rgb(191 219 254); }
.bg-blue-500 { background-color: rgb(59 130 246); }
.bg-blue-600 { background-color: rgb(37 99 235); }
.bg-blue-700 { background-color: rgb(29 78 216); }
.bg-purple-600 { background-color: rgb(147 51 234); }
.bg-purple-700 { background-color: rgb(126 34 206); }
.bg-pink-500 { background-color: rgb(236 72 153); }

/* Colors - Text */
.text-white { color: rgb(255 255 255); }
.text-gray-200 { color: rgb(229 231 235); }
.text-gray-300 { color: rgb(209 213 219); }
.text-gray-400 { color: rgb(156 163 175); }
.text-gray-500 { color: rgb(107 114 128); }
.text-gray-700 { color: rgb(55 65 81); }
.text-red-800 { color: rgb(153 27 27); }
.text-green-800 { color: rgb(22 101 52); }
.text-yellow-800 { color: rgb(133 77 14); }
.text-blue-600 { color: rgb(37 99 235); }
.text-blue-700 { color: rgb(29 78 216); }
.text-blue-800 { color: rgb(30 64 175); }
.text-blue-900 { color: rgb(30 58 138); }
.text-blue-100 { color: rgb(219 234 254); }

/* Colors - Borders */
.border { border-width: 1px; }
.border-2 { border-width: 2px; }
.border-t { border-top-width: 1px; }
.border-b { border-bottom-width: 1px; }
.border-b-2 { border-bottom-width: 2px; }
.border-transparent { border-color: transparent; }
.border-gray-300 { border-color: rgb(209 213 219); }
.border-gray-600 { border-color: rgb(75 85 99); }
.border-gray-700 { border-color: rgb(55 65 81); }
.border-blue-200 { border-color: rgb(191 219 254); }
.border-blue-500 { border-color: rgb(59 130 246); }

/* Border Radius */
.rounded { border-radius: 0.25rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-full { border-radius: 9999px; }

/* Typography */
.text-xs { font-size: 0.75rem; line-height: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.text-lg { font-size: 1.125rem; line-height: 1.75rem; }
.text-xl { font-size: 1.25rem; line-height: 1.75rem; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.leading-tight { line-height: 1.25; }
.leading-relaxed { line-height: 1.625; }
.text-left { text-align: left; }
.text-center { text-align: center; }
.truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }

/* Display */
.block { display: block; }
.inline-flex { display: inline-flex; }
.hidden { display: none; }

/* Overflow */
.overflow-hidden { overflow: hidden; }
.overflow-y-auto { overflow-y: auto; }
.overflow-x-auto { overflow-x: auto; }

/* Z-Index */
.z-\\[9999998\\] { z-index: 9999998; }
.z-\\[9999999\\] { z-index: 9999999; }
.z-\\[1000000\\] { z-index: 1000000; }
.z-\\[1000001\\] { z-index: 1000001; }

/* Effects */
.shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
.shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
.shadow-2xl { box-shadow: 0 25px 50px -12px rgb(0 0 0 / 0.25); }
.backdrop-blur-sm { backdrop-filter: blur(4px); }

/* Gradients */
.bg-gradient-to-br { background-image: linear-gradient(to bottom right, var(--tw-gradient-stops)); }
.from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-to: rgb(239 246 255 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-blue-500 { --tw-gradient-from: #3b82f6; --tw-gradient-to: rgb(59 130 246 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-to: rgb(37 99 235 / 0); --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-indigo-100 { --tw-gradient-to: #e0e7ff; }
.to-cyan-500 { --tw-gradient-to: #06b6d4; }
.to-purple-600 { --tw-gradient-to: #9333ea; }

/* Transitions */
.transition-colors { transition-property: color, background-color, border-color, text-decoration-color, fill, stroke; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.transition-all { transition-property: all; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1); transition-duration: 150ms; }
.duration-150 { transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }

/* Hover states */
.hover\\:bg-gray-300:hover { background-color: rgb(209 213 219); }
.hover\\:bg-gray-500:hover { background-color: rgb(107 114 128); }
.hover\\:bg-gray-700\\/70:hover { background-color: rgb(55 65 81 / 0.7); }
.hover\\:bg-gray-800:hover { background-color: rgb(31 41 55); }
.hover\\:bg-blue-50:hover { background-color: rgb(239 246 255); }
.hover\\:bg-blue-200:hover { background-color: rgb(191 219 254); }
.hover\\:bg-blue-700:hover { background-color: rgb(29 78 216); }
.hover\\:bg-red-700:hover { background-color: rgb(185 28 28); }
.hover\\:bg-green-700:hover { background-color: rgb(21 128 61); }
.hover\\:text-white:hover { color: rgb(255 255 255); }
.hover\\:border-gray-500:hover { border-color: rgb(107 114 128); }
.hover\\:border-gray-600:hover { border-color: rgb(75 85 99); }

/* Focus states */
.focus\\:outline-none:focus { outline: 2px solid transparent; outline-offset: 2px; }
.focus\\:border-blue-500:focus { border-color: rgb(59 130 246); }
.focus\\:border-transparent:focus { border-color: transparent; }
.focus\\:ring-2:focus { box-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color); }
.focus\\:ring-4:focus { box-shadow: var(--tw-ring-inset) 0 0 0 calc(4px + var(--tw-ring-offset-width)) var(--tw-ring-color); }
.focus\\:ring-blue-500:focus { --tw-ring-color: rgb(59 130 246); }
.focus\\:ring-blue-500\\/50:focus { --tw-ring-color: rgb(59 130 246 / 0.5); }

/* Disabled states */
.disabled\\:opacity-50:disabled { opacity: 0.5; }
.disabled\\:cursor-not-allowed:disabled { cursor: not-allowed; }

/* Animations */
.animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: .5; }
}

/* Cursor */
.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }

/* Pointer Events */
.pointer-events-none { pointer-events: none; }

/* Misc */
.appearance-none { appearance: none; }
.capitalize { text-transform: capitalize; }
`;
    
    // Write the CSS file
    writeFileSync('dist/css/main.css', css);
    
    console.log('✅ Tailwind CSS built successfully!');
    console.log(`📁 Output: dist/css/main.css (${css.length} bytes)`);
    
  } catch (error) {
    console.error('❌ Error building CSS:', error);
    process.exit(1);
  }
}

buildCSS();
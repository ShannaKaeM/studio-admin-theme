# React Learning Guide - Daniel's Boilerplate

**For ADHD-friendly learning: Clear, direct, no fluff**

---

## **What This Is**
Daniel's React boilerplate turns React apps into WordPress plugins using Shadow DOM. Think of it as a React app that lives inside WordPress without breaking anything.

---

## **FOLDER STRUCTURE EXPLAINED**

### **📁 dist/** - Built Files (Don't Touch)
```
dist/
├── css/main.css     ← Your Tailwind CSS (35KB)
└── js/studio4.js    ← Your React app (1MB)
```
- **What**: Final built files WordPress actually uses
- **When**: Created when you run `npm run build`
- **Rule**: Never edit these directly

### **📁 src/** - Your Code Lives Here
This is where you write everything.

#### **📁 src/components/** - React Components
```jsx
// Example: Panel.jsx
export function Panel() {
  return <div>Hello World</div>;
}
```
- **What**: Reusable UI pieces
- **Think**: Like LEGO blocks for your interface
- **Files**: Panel.jsx, CommandPalette.jsx, etc.

#### **📁 src/s4/** - S4 Design System Stuff
```
s4/
├── components/     ← S4-specific React components
├── presets/       ← JSON color/layout presets
└── utils/         ← S4 helper functions
```
- **What**: Your custom design system components
- **Main File**: `S4ThemeBuilder.jsx` (the big interface)

#### **📁 src/storage/** - App State
```javascript
// store.js - Zustand store
const useStore = create((set) => ({
  isOpen: false,
  toggle: () => set((state) => ({ isOpen: !state.isOpen }))
}));
```
- **What**: Manages app data/settings
- **Tool**: Zustand (like Redux but simpler)
- **Saves**: Everything to browser localStorage

#### **📁 src/styles/** - CSS
```css
/* main.css */
@import "tailwindcss";
@theme inline {
  --color-primary: oklch(56.8% 0.143 7.2);
}
```
- **What**: Tailwind CSS 4 configuration
- **Special**: Uses `@theme` directive (new in v4)

#### **📁 src/utils/** - Helper Functions
```javascript
// helpers.js
export const formatColor = (hsl) => `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
```
- **What**: Reusable functions
- **Examples**: Color conversion, keyboard shortcuts

### **📁 Root Files** - Configuration

#### **Main App Files**
- **`main.jsx`** - Entry point, creates web component
- **`ShadowApp.jsx`** - Main React app
- **`studio4.php`** - WordPress plugin file

#### **Config Files**
- **`package.json`** - Dependencies and scripts
- **`vite.config.js`** - Build configuration
- **`build-css.js`** - Tailwind CSS build script

---

## **HOW IT WORKS - SIMPLE VERSION**

### **1. Development**
```bash
npm run dev    # Start development server
# Edit files in src/
# Browser updates automatically
```

### **2. Building**
```bash
npm run build  # Creates dist/ files
# WordPress loads dist/js/studio4.js
# Your React app appears in WordPress
```

### **3. WordPress Integration**
```php
// studio4.php loads your React app
<studio4-builder></studio4-builder>
```
- **Shadow DOM**: Your styles won't break WordPress
- **Web Component**: React app becomes a custom HTML tag

---

## **KEY CONCEPTS**

### **Shadow DOM**
- **What**: Isolates your CSS from WordPress
- **Why**: WordPress themes won't break your app
- **Think**: Your app lives in a protective bubble

### **Web Components**
- **What**: Custom HTML tags (`<studio4-builder>`)
- **How**: `main.jsx` registers the component
- **Result**: React app works like regular HTML

### **State Management (Zustand)**
```javascript
// Reading state
const { isOpen, toggle } = useStore();

// Using in component
<button onClick={toggle}>
  {isOpen ? 'Close' : 'Open'}
</button>
```
- **Simple**: No complex Redux setup
- **Persistent**: Saves to localStorage automatically

### **CSS Variables System**
```css
:root {
  --color-primary: hsl(337, 35%, 52%);
}

.button {
  background: var(--color-primary);
}
```
- **Dynamic**: Change colors in real-time
- **S4 System**: 4-layer design architecture

---

## **MOST IMPORTANT FILES**

1. **`src/main.jsx`** - App entry point
2. **`src/ShadowApp.jsx`** - Main React component
3. **`src/s4/components/S4ThemeBuilder.jsx`** - Main interface
4. **`src/storage/store.js`** - App state
5. **`src/styles/main.css`** - Styling
6. **`studio4.php`** - WordPress integration

---

## **COMMON TASKS**

### **Add New Component**
1. Create `src/components/MyComponent.jsx`
2. Export function: `export function MyComponent() {}`
3. Import in parent: `import { MyComponent } from './MyComponent';`

### **Add New State**
1. Open `src/storage/store.js`
2. Add to state object: `myValue: 'default'`
3. Add action: `setMyValue: (value) => set({ myValue: value })`

### **Style Changes**
1. Edit `src/styles/main.css` for global styles
2. Use Tailwind classes in components: `className="bg-primary text-white"`

---

## **NEXT LEARNING STEPS**

1. **Understand main.jsx** - How web component is created
2. **Explore ShadowApp.jsx** - Main React structure
3. **Study store.js** - State management patterns
4. **Learn S4ThemeBuilder.jsx** - Complex component example
5. **CSS System** - How Tailwind 4 works here

**Remember**: Start small, build understanding gradually. Each file has a specific job.
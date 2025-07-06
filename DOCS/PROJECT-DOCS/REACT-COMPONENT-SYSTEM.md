# React Component System for S4 Plugin
## Using Tailwind 4 for Consistent, AI-Friendly Development

---

## 🎯 **THE CHALLENGE**
Building React components with AI assistance while maintaining:
- Visual consistency across the entire app
- Easy updates and modifications
- Professional design quality
- Developer-friendly patterns

---

## 🏗️ **COMPONENT ARCHITECTURE**

### **1. Base Component Pattern**
Every component follows this structure for consistency:

```tsx
// components/ui/Card.tsx
import { cn } from '@/utils/cn';

interface CardProps {
  variant?: 'default' | 'bordered' | 'elevated';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export function Card({ 
  variant = 'default', 
  size = 'md',
  className,
  children 
}: CardProps) {
  return (
    <div 
      className={cn(
        // Base styles (always applied)
        'rounded-lg transition-all',
        
        // Variant styles
        {
          'bg-white dark:bg-gray-800': variant === 'default',
          'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700': variant === 'bordered',
          'bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl': variant === 'elevated',
        },
        
        // Size styles
        {
          'p-4': size === 'sm',
          'p-6': size === 'md',
          'p-8': size === 'lg',
        },
        
        // Custom classes (for one-off adjustments)
        className
      )}
    >
      {children}
    </div>
  );
}
```

### **2. Component Categories**

```
/components
  /ui            # Base UI components
    - Button.tsx
    - Card.tsx
    - Input.tsx
    - Select.tsx
    - Modal.tsx
    - Tabs.tsx
    
  /layout        # Layout components
    - PageHeader.tsx
    - Sidebar.tsx
    - Container.tsx
    - Grid.tsx
    
  /s4            # S4-specific components
    - ColorPicker.tsx
    - PresetCard.tsx
    - LayoutTransformer.tsx
    - LivePreview.tsx
    
  /composite     # Composed from base components
    - ColorPresetBuilder.tsx
    - ThemeExporter.tsx
    - ComponentGrid.tsx
```

---

## 🎨 **TAILWIND DESIGN TOKENS**

### **1. Custom Theme Configuration**
```javascript
// tailwind.config.js
export default {
  theme: {
    extend: {
      colors: {
        // S4 Brand Colors (will be CSS vars later)
        studio: {
          primary: '#276860',
          secondary: '#709933',
          neutral: '#333333',
          base: '#FAFAFA'
        },
        
        // UI Colors (for the plugin interface)
        ui: {
          background: '#FFFFFF',
          surface: '#F8F9FA',
          border: '#E5E7EB',
          text: {
            primary: '#111827',
            secondary: '#6B7280',
            muted: '#9CA3AF'
          }
        }
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      
      fontSize: {
        'xxs': '0.625rem',
      },
      
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
      }
    }
  }
}
```

### **2. Component Style Guide**

#### **Spacing Scale**
```
p-2  (0.5rem)  - Tight spacing
p-4  (1rem)    - Default spacing
p-6  (1.5rem)  - Comfortable spacing
p-8  (2rem)    - Spacious
```

#### **Border Radius**
```
rounded       - Small (0.25rem)
rounded-md    - Medium (0.375rem)
rounded-lg    - Large (0.5rem)
rounded-xl    - Extra (0.75rem)
```

#### **Shadows**
```
shadow-sm     - Subtle elevation
shadow        - Default card shadow
shadow-lg     - High elevation
shadow-soft   - Custom soft shadow
```

---

## 🔧 **UTILITY HELPERS**

### **1. Class Name Merger (cn)**
```typescript
// utils/cn.ts
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### **2. Component Variants Helper**
```typescript
// utils/variants.ts
import { cva, type VariantProps } from 'class-variance-authority';

export const buttonVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-studio-primary text-white hover:bg-studio-primary/90',
        secondary: 'bg-studio-secondary text-white hover:bg-studio-secondary/90',
        outline: 'border border-ui-border bg-transparent hover:bg-ui-surface',
        ghost: 'hover:bg-ui-surface hover:text-ui-text-primary',
      },
      size: {
        sm: 'h-9 px-3 text-sm',
        md: 'h-10 px-4',
        lg: 'h-11 px-8',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export type ButtonVariants = VariantProps<typeof buttonVariants>;
```

---

## 📐 **EXAMPLE COMPONENTS**

### **1. Button Component**
```tsx
// components/ui/Button.tsx
import { forwardRef } from 'react';
import { cn } from '@/utils/cn';
import { buttonVariants, type ButtonVariants } from '@/utils/variants';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariants {
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg className="mr-2 h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
```

### **2. Color Picker Component**
```tsx
// components/s4/ColorPicker.tsx
import { useState } from 'react';
import { cn } from '@/utils/cn';

interface ColorPickerProps {
  value: { h: number; s: number; l: number };
  onChange: (color: { h: number; s: number; l: number }) => void;
  label?: string;
}

export function ColorPicker({ value, onChange, label }: ColorPickerProps) {
  return (
    <div className="space-y-4">
      {label && (
        <label className="text-sm font-medium text-ui-text-primary">
          {label}
        </label>
      )}
      
      <div className="rounded-lg border border-ui-border bg-ui-surface p-4 space-y-3">
        {/* Color Preview */}
        <div 
          className="h-20 w-full rounded-md shadow-inner"
          style={{ backgroundColor: `hsl(${value.h}, ${value.s}%, ${value.l}%)` }}
        />
        
        {/* HSL Sliders */}
        <div className="space-y-2">
          <SliderInput
            label="Hue"
            value={value.h}
            max={360}
            onChange={(h) => onChange({ ...value, h })}
          />
          <SliderInput
            label="Saturation"
            value={value.s}
            max={100}
            suffix="%"
            onChange={(s) => onChange({ ...value, s })}
          />
          <SliderInput
            label="Lightness"
            value={value.l}
            max={100}
            suffix="%"
            onChange={(l) => onChange({ ...value, l })}
          />
        </div>
      </div>
    </div>
  );
}

// Sub-component for consistency
function SliderInput({ label, value, max, suffix = '', onChange }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-xs font-medium text-ui-text-secondary w-20">
        {label}
      </span>
      <input
        type="range"
        value={value}
        max={max}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      <span className="text-sm font-mono text-ui-text-primary w-12 text-right">
        {value}{suffix}
      </span>
    </div>
  );
}
```

---

## 🤖 **AI DEVELOPMENT GUIDELINES**

### **When Building Components, Tell AI:**

1. **Use the component pattern**:
   ```
   "Create a Card component following our pattern with:
   - TypeScript interface
   - cn() for className merging
   - Variant props (default, bordered, elevated)
   - Size props (sm, md, lg)
   - Dark mode support"
   ```

2. **Reference existing components**:
   ```
   "Create a Select component similar to our Button component pattern"
   ```

3. **Specify Tailwind constraints**:
   ```
   "Use only Tailwind classes, no inline styles except for dynamic values"
   ```

4. **Request consistent spacing**:
   ```
   "Use our spacing scale: p-2, p-4, p-6, p-8"
   ```

---

## 📦 **COMPONENT LIBRARY STRUCTURE**

### **1. Index Exports**
```typescript
// components/ui/index.ts
export { Button } from './Button';
export { Card } from './Card';
export { Input } from './Input';
// ... etc
```

### **2. Usage in Pages**
```tsx
// pages/Colors.tsx
import { Button, Card } from '@/components/ui';
import { ColorPicker } from '@/components/s4';

export function ColorsPage() {
  return (
    <div className="p-8 space-y-6">
      <Card variant="elevated" size="lg">
        <h2 className="text-2xl font-semibold text-ui-text-primary mb-6">
          Brand Colors
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ColorPicker label="Primary Color" />
          <ColorPicker label="Secondary Color" />
        </div>
      </Card>
    </div>
  );
}
```

---

## 🎯 **BENEFITS OF THIS SYSTEM**

1. **Consistency**: Every component follows the same pattern
2. **AI-Friendly**: Clear patterns for AI to follow
3. **Maintainable**: Changes in one place affect all components
4. **Type-Safe**: TypeScript catches errors
5. **Dark Mode**: Built-in with dark: variants
6. **Responsive**: Mobile-first with md:, lg: prefixes
7. **Customizable**: className prop for one-offs

---

## 🚀 **GETTING STARTED**

1. **Set up Tailwind 4**:
   ```bash
   npm install tailwindcss@next @tailwindcss/vite@next
   ```

2. **Create base components** following the patterns above

3. **Build S4-specific components** using the base components

4. **Keep this guide handy** when working with AI

---

**With this system, you can confidently build a consistent, professional React plugin even without React expertise!**
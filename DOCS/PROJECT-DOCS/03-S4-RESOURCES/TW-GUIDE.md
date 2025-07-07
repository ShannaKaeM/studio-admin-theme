# TAILWIND CSS 4 REFERENCE GUIDE

**Important**: Tailwind CSS 4 is significantly different from v3. This guide focuses on v4 patterns and best practices.

## 📚 **ESSENTIAL TAILWIND 4 DOCUMENTATION**

### **Core Concepts**
1. [Styling with Utility Classes](https://tailwindcss.com/docs/styling-with-utility-classes)
2. [Hover, Focus, and Other States](https://tailwindcss.com/docs/hover-focus-and-other-states)
3. [Responsive Design](https://tailwindcss.com/docs/responsive-design)
4. [Dark Mode](https://tailwindcss.com/docs/dark-mode)

### **Customization & Theming**
5. [Theme Configuration](https://tailwindcss.com/docs/theme)
6. [Colors](https://tailwindcss.com/docs/colors)
7. [Adding Custom Styles](https://tailwindcss.com/docs/adding-custom-styles)

### **Advanced**
8. [Detecting Classes in Source Files](https://tailwindcss.com/docs/detecting-classes-in-source-files)
9. [Functions and Directives](https://tailwindcss.com/docs/functions-and-directives)

---

## 🚨 **KEY TAILWIND 4 CHANGES**

### **@theme Directive**
Tailwind 4 uses `@theme` instead of config files:
```css
@theme {
  --color-primary: #3b82f6;
  --font-family-sans: Inter, sans-serif;
}
```

### **CSS-First Approach**
- No more `tailwind.config.js` files (optional)
- Theme defined directly in CSS
- Better performance and simpler setup

### **New Color System**
- Uses CSS custom properties
- Better dark mode support
- More semantic color naming

---

## ✅ **BEST PRACTICES FOR AI AGENTS**

### **When Working with Tailwind 4:**
1. **Always check the v4 docs** - Don't assume v3 patterns work
2. **Use @theme directive** - Not config objects when possible
3. **Leverage CSS custom properties** - For dynamic theming
4. **Think CSS-first** - Then add utilities
5. **Use semantic naming** - Not arbitrary values when possible

### **Common Mistakes to Avoid:**
- Using old config.js patterns in v4
- Mixing v3 and v4 syntax
- Not leveraging new CSS custom properties
- Ignoring new color system improvements

---

This guide should be referenced before making any Tailwind-related decisions to ensure v4 compatibility and best practices.
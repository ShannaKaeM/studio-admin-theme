# S4 SYSTEM IMPLEMENTATION PLAN

## 🎯 Immediate Goal: Simple Working Vertical Slice

### Phase 1: Complete Theme Foundation

#### 1.1 Typography (ADD NEXT)
```jsx
// Add to Theme > Typography section
- Font Stack Selector
  - System Font (default)
  - Custom Font (Google Fonts integration later)
- Base Font Size
  - base-font-size: 1rem - add to root along with base-color
  - Affects all relative sizing -via presets pre applied. so we wil rough in all the elements with base font size and then we can setup the presets to adjust the relative sizing. 
```

#### 1. GLOBAL Typography Elements  
Create comprehensive property controls for each element:

  'title': {
    fontSize: '--title-size',             // Uses base-size
    fontWeight: '--title-weight',
    lineHeight: '--title-line-height',
    color: '--title-color',               // Uses base-color
    margin: '--title-margin',
    textTransform: '--title-transform'
  },
  - pretitle
  - subtitle
  - description
  - body
  - quote
  - caption
  - label
  - etc. 
  - interactive elements in ui section like buttons links etc.
  
}
```


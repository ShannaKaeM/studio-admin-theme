# PLUGIN SYSTEM - DETAILS

## DANIEL'S R2WC BOILERPLATE
- **React to Web Component** architecture
- **Shadow DOM isolation** prevents WordPress theme conflicts
- **Singleton pattern** for WordPress plugin structure
- **Base64 CSS transport** to prevent corruption

## TECHNICAL STACK
- **React 18** with modern hooks and patterns
- **Zustand** for state management with localStorage
- **Tailwind CSS 4** with @theme directive
- **Vite** build system with hot reload
- **ShadCN** design system tokens

## WORDPRESS INTEGRATION
- **Custom table**: `wp_studio4_data` for settings storage
- **REST API**: `/wp-json/studio4/v1/` endpoints
- **Rewrite rules**: Frontend access at `/studio4/`
- **Admin page**: Settings → Studio4
- **Web component**: `<studio4-builder>` renders React in Shadow DOM

## BUILD CONFIGURATION
```bash
# Development
npm run dev          # Hot reload development
npm run build        # Production build + tests
npm run build:css    # CSS-only build

# Output
dist/js/studio4.js   # ~1MB React bundle (IIFE)
dist/css/main.css    # ~34KB Tailwind with ShadCN
```

## FILE STRUCTURE
```
studio4/
├── studio4.php              # Main plugin file
├── src/                     # React source
├── dist/                    # Build output
├── includes/api/            # WordPress REST API
└── tests/                   # Test suite
```

## DEVELOPMENT ACCESS
- **Admin**: Settings → Studio4
- **Frontend**: `localhost:10100/studio4/`
- **Dev mode**: Add `?dev=true` parameter
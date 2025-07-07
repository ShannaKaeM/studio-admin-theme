# Running Studio4 with a Local Server

To use the JSON preset loading feature, you need to run Studio4 from a local web server (due to browser CORS security).

## Quick Start

### Option 1: Using the provided script
```bash
./start-server.sh
```
Then open: http://localhost:8000/studio4.html

### Option 2: Manual Python server
```bash
cd "/Users/shannamiddleton/Local Drive Mac/mi agency/miProjects/wp-studio4"
python3 -m http.server 8000
```
Then open: http://localhost:8000/studio4.html

### Option 3: Using PHP (if you have it)
```bash
cd "/Users/shannamiddleton/Local Drive Mac/mi agency/miProjects/wp-studio4"
php -S localhost:8000
```

### Option 4: Using Node.js (if you have it)
```bash
npx http-server -p 8000
```

## What the JSON presets contain:
- **Colors**: Base color values and lightness palettes
- **Typography**: Font sizes, weights, line-heights, etc.

## What the HTML theme file contains:
- **Everything**: Full CSS, HTML structure, all component styles

The JSON is just for quickly loading/sharing color and typography settings, while the HTML file is your complete theme.
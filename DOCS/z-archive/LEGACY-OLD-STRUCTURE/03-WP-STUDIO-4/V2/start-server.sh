#!/bin/bash

# Simple script to start a local web server for Studio4

echo "Starting Studio4 local server..."
echo "Server will be available at: http://localhost:8000"
echo "Press Ctrl+C to stop the server"
echo ""

# Change to the wp-studio4 directory
cd "$(dirname "$0")"

# Start Python's built-in HTTP server
python3 -m http.server 8000
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>The Studio - Professional Visual Design System</title>
    <?php wp_head(); ?>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
        }
        #studio-root {
            width: 100vw;
            height: 100vh;
        }
        .studio-admin-wrapper {
            height: 100vh !important;
            margin: 0 !important;
        }
        
        /* Hide WordPress admin bar */
        #wpadminbar {
            display: none !important;
        }
        html {
            margin-top: 0 !important;
        }
        
        /* Fullscreen button */
        .studio-fullscreen-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 9999;
            width: 40px;
            height: 40px;
            background: var(--studio-primary-500);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
            transition: all 0.2s ease;
        }
        
        .studio-fullscreen-toggle:hover {
            transform: scale(1.1);
            box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
        }
    </style>
</head>
<body <?php body_class('studio-standalone'); ?>>
    <div id="studio-root" class="studio-admin-wrapper"></div>
    
    <button class="studio-fullscreen-toggle" onclick="toggleFullscreen()" title="Toggle Fullscreen">
        <span id="fullscreen-icon">⛶</span>
    </button>
    
    <?php wp_footer(); ?>
    
    <script>
        // Remove admin bar space
        document.documentElement.style.setProperty('margin-top', '0', 'important');
        
        // Fullscreen functionality
        function toggleFullscreen() {
            const elem = document.documentElement;
            const icon = document.getElementById('fullscreen-icon');
            
            if (!document.fullscreenElement) {
                elem.requestFullscreen().then(() => {
                    icon.textContent = '⛶';
                }).catch(err => {
                    console.error(`Error attempting to enable fullscreen: ${err.message}`);
                });
            } else {
                document.exitFullscreen().then(() => {
                    icon.textContent = '⛶';
                });
            }
        }
        
        // ESC key to exit fullscreen
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && document.fullscreenElement) {
                document.exitFullscreen();
            }
        });
    </script>
</body>
</html>
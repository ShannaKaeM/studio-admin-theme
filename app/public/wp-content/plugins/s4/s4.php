<?php
/**
 * Plugin Name: Studio1 - The One Element System
 * Plugin URI: https://studio1.design
 * Description: Revolutionary unified element system with ultimate flexibility. One class, infinite possibilities.
 * Version: 1.0.0
 * Author: Studio1 Team
 * License: MIT
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('STUDIO1_PLUGIN_URL', plugin_dir_url(__FILE__));
define('STUDIO1_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('STUDIO1_VERSION', '1.0.0');

class Studio1Plugin {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('admin_enqueue_scripts', array($this, 'enqueue_admin_scripts'));
        add_action('rest_api_init', array($this, 'register_rest_routes'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
        add_action('template_redirect', array($this, 'handle_frontend_page'));
    }
    
    public function init() {
        // Register custom web component
        add_action('wp_footer', array($this, 'render_web_component'));
        add_action('admin_footer', array($this, 'render_web_component'));
        
        // Add rewrite rules for /studio1 page
        add_rewrite_rule('^studio1/?$', 'index.php?studio1_page=1', 'top');
        add_filter('query_vars', array($this, 'add_query_vars'));
    }
    
    public function enqueue_scripts() {
        // Only load on frontend if needed
        if (is_user_logged_in() && current_user_can('manage_options')) {
            wp_enqueue_script(
                'studio1-app',
                STUDIO1_PLUGIN_URL . 'dist/studio1.js',
                array(),
                STUDIO1_VERSION,
                true
            );
            
            wp_enqueue_style(
                'studio1-styles',
                STUDIO1_PLUGIN_URL . 'dist/studio1.css',
                array(),
                STUDIO1_VERSION
            );
        }
    }
    
    public function enqueue_admin_scripts($hook) {
        // Load on all admin pages for now
        wp_enqueue_script(
            'studio1-admin-app',
            STUDIO1_PLUGIN_URL . 'dist/studio1.js',
            array(),
            STUDIO1_VERSION,
            true
        );
        
        wp_enqueue_style(
            'studio1-admin-styles',
            STUDIO1_PLUGIN_URL . 'dist/studio1.css',
            array(),
            STUDIO1_VERSION
        );
        
        // Pass data to JavaScript
        wp_localize_script('studio1-admin-app', 'studio1Config', array(
            'apiUrl' => rest_url('studio1/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'adminUrl' => admin_url(),
            'pluginUrl' => STUDIO1_PLUGIN_URL,
            'version' => STUDIO1_VERSION,
            'isAdmin' => is_admin(),
            'canManage' => current_user_can('manage_options')
        ));
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'Studio1 - The One Element System',
            'Studio1',
            'manage_options',
            'studio1-dashboard',
            array($this, 'admin_page'),
            'dashicons-art',
            30
        );
    }
    
    public function admin_page() {
        echo '<div id="studio1-admin-root"></div>';
    }
    
    public function add_query_vars($vars) {
        $vars[] = 'studio1_page';
        return $vars;
    }
    
    public function handle_frontend_page() {
        // Check if we're on the /studio1 page via query var or URI
        $is_studio1_page = get_query_var('studio1_page');
        $request_uri = $_SERVER['REQUEST_URI'];
        
        if ($is_studio1_page || strpos($request_uri, '/studio1') === 0 || strpos($request_uri, '/studio1/') === 0) {
            // Only allow access for users who can manage options
            if (!current_user_can('manage_options')) {
                wp_redirect(wp_login_url($request_uri));
                exit;
            }
            
            $this->render_frontend_page();
            exit;
        }
    }
    
    public function render_frontend_page() {
        // Remove admin bar and admin styles for standalone experience
        show_admin_bar(false);
        remove_action('wp_head', '_admin_bar_bump_cb');
        
        // Output the full-screen HTML page
        ?>
        <!DOCTYPE html>
        <html <?php language_attributes(); ?>>
        <head>
            <meta charset="<?php bloginfo('charset'); ?>">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Studio1 - The One Element System - <?php bloginfo('name'); ?></title>
            
            <!-- Studio1 Standalone Styles -->
            <link rel="stylesheet" href="<?php echo STUDIO1_PLUGIN_URL; ?>dist/studio1.css?v=<?php echo STUDIO1_VERSION; ?>">
            
            <!-- Minimal WordPress head without admin interference -->
            <style>
                /* Reset and remove WordPress admin interference */
                * {
                    box-sizing: border-box;
                }
                
                body {
                    margin: 0 !important;
                    padding: 0 !important;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #0a0a0a !important;
                    color: #ffffff;
                    overflow-x: hidden;
                    position: relative;
                }
                
                /* Remove any WordPress admin styling */
                html {
                    margin-top: 0 !important;
                    padding-top: 0 !important;
                }
                
                #studio1-frontend-root {
                    width: 100vw;
                    height: 100vh;
                    overflow: auto;
                    position: fixed;
                    top: 0;
                    left: 0;
                    z-index: 999999;
                }
            </style>
        </head>
        <body>
            <div id="studio1-frontend-root"></div>
            <studio1-element data-mode="frontend"></studio1-element>
            
            <!-- Studio1 Configuration -->
            <script>
                window.studio1Config = {
                    apiUrl: '<?php echo rest_url('studio1/v1/'); ?>',
                    nonce: '<?php echo wp_create_nonce('wp_rest'); ?>',
                    version: '<?php echo STUDIO1_VERSION; ?>',
                    isAdmin: false,
                    canManage: <?php echo current_user_can('manage_options') ? 'true' : 'false'; ?>,
                    isFrontend: true
                };
            </script>
            
            <!-- Studio1 Application -->
            <script src="<?php echo STUDIO1_PLUGIN_URL; ?>dist/studio1.js?v=<?php echo STUDIO1_VERSION; ?>"></script>
        </body>
        </html>
        <?php
    }
    
    public function render_web_component() {
        if (is_user_logged_in() && current_user_can('manage_options')) {
            echo '<studio1-element></studio1-element>';
        }
    }
    
    public function register_rest_routes() {
        register_rest_route('studio1/v1', '/config', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_config'),
            'permission_callback' => array($this, 'check_permissions')
        ));
        
        register_rest_route('studio1/v1', '/config', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_config'),
            'permission_callback' => array($this, 'check_permissions')
        ));
        
        register_rest_route('studio1/v1', '/docs/(?P<folder>[a-zA-Z0-9-_]+)/(?P<file>[a-zA-Z0-9-_.]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_document'),
            'permission_callback' => array($this, 'check_permissions')
        ));
    }
    
    public function check_permissions() {
        return current_user_can('manage_options');
    }
    
    public function get_config() {
        $config = get_option('studio1_theme_config', array());
        return rest_ensure_response($config);
    }
    
    public function save_config($request) {
        $config = $request->get_json_params();
        update_option('studio1_theme_config', $config);
        return rest_ensure_response(array('success' => true));
    }
    
    public function get_document($request) {
        $folder = $request['folder'];
        $file = $request['file'];
        
        // Security: Only allow specific folders and file types
        $allowed_folders = array('design-system', 'plugin-backend', 'plugin-frontend', 'tech-stack');
        $allowed_extensions = array('md', 'html', 'json', 'css', 'js');
        
        if (!in_array($folder, $allowed_folders)) {
            return new WP_Error('invalid_folder', 'Invalid folder', array('status' => 400));
        }
        
        $file_extension = pathinfo($file, PATHINFO_EXTENSION);
        if (!in_array($file_extension, $allowed_extensions)) {
            return new WP_Error('invalid_file', 'Invalid file type', array('status' => 400));
        }
        
        $file_path = STUDIO1_PLUGIN_PATH . "PROJECT-DOCS/{$folder}/{$file}";
        
        if (!file_exists($file_path)) {
            return new WP_Error('file_not_found', 'File not found', array('status' => 404));
        }
        
        $content = file_get_contents($file_path);
        return rest_ensure_response(array(
            'content' => $content,
            'path' => $file_path,
            'folder' => $folder,
            'file' => $file
        ));
    }
}

// Initialize the plugin
new Studio1Plugin();

// Activation hook to flush rewrite rules
register_activation_hook(__FILE__, function() {
    // Add rewrite rules
    add_rewrite_rule('^studio1/?$', 'index.php?studio1_page=1', 'top');
    // Flush rewrite rules
    flush_rewrite_rules();
});

// Deactivation hook to clean up
register_deactivation_hook(__FILE__, function() {
    flush_rewrite_rules();
});

// Activation hook
register_activation_hook(__FILE__, function() {
    // Set default configuration
    $default_config = array(
        'version' => STUDIO1_VERSION,
        'initialized' => true,
        'brand' => array(
            'color1' => 'hsl(337, 35%, 52%)',
            'color2' => 'hsl(29, 44%, 53%)', 
            'color3' => 'hsl(0, 0%, 46%)',
            'color4' => 'hsl(0, 0%, 100%)'
        ),
        'typography' => array(
            'font-family' => 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif'
        )
    );
    
    add_option('studio1_theme_config', $default_config);
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    // Clean up if needed
});

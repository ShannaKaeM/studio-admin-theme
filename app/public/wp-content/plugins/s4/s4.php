<?php
/**
 * Plugin Name: S4 - Studio4 Design System
 * Plugin URI: https://studio4.design
 * Description: Revolutionary preset-driven design system with V2.0 architecture. No Tailwind, pure CSS custom properties.
 * Version: 2.0.0
 * Author: Studio4 Team
 * License: MIT
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('S4_PLUGIN_URL', plugin_dir_url(__FILE__));
define('S4_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('S4_VERSION', '2.0.0');

class S4Plugin {
    
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
        
        // Add rewrite rules for /s4 page
        add_rewrite_rule('^s4/?$', 'index.php?s4_page=1', 'top');
        add_filter('query_vars', array($this, 'add_query_vars'));
    }
    
    public function enqueue_scripts() {
        // Only load on frontend if needed
        if (is_user_logged_in() && current_user_can('manage_options')) {
            wp_enqueue_script(
                's4-app',
                S4_PLUGIN_URL . 'dist/s4.js',
                array(),
                S4_VERSION,
                true
            );
            
            wp_enqueue_style(
                's4-styles',
                S4_PLUGIN_URL . 'dist/s4.css',
                array(),
                S4_VERSION
            );
        }
    }
    
    public function enqueue_admin_scripts($hook) {
        // Load on all admin pages for now
        wp_enqueue_script(
            's4-admin-app',
            S4_PLUGIN_URL . 'dist/s4.js',
            array(),
            S4_VERSION,
            true
        );
        
        wp_enqueue_style(
            's4-admin-styles',
            S4_PLUGIN_URL . 'dist/s4.css',
            array(),
            S4_VERSION
        );
        
        // Pass data to JavaScript
        wp_localize_script('s4-admin-app', 's4Config', array(
            'apiUrl' => rest_url('s4/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'adminUrl' => admin_url(),
            'pluginUrl' => S4_PLUGIN_URL,
            'version' => S4_VERSION,
            'isAdmin' => is_admin(),
            'canManage' => current_user_can('manage_options')
        ));
    }
    
    public function add_admin_menu() {
        add_menu_page(
            'S4 Design System',
            'S4 Studio',
            'manage_options',
            's4-dashboard',
            array($this, 'admin_page'),
            'dashicons-art',
            30
        );
    }
    
    public function admin_page() {
        echo '<div id="s4-admin-root"></div>';
    }
    
    public function add_query_vars($vars) {
        $vars[] = 's4_page';
        return $vars;
    }
    
    public function handle_frontend_page() {
        // Check if we're on the /s4 page via query var or URI
        $is_s4_page = get_query_var('s4_page');
        $request_uri = $_SERVER['REQUEST_URI'];
        
        if ($is_s4_page || strpos($request_uri, '/s4') === 0 || strpos($request_uri, '/s4/') === 0) {
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
        // Enqueue our scripts and styles
        wp_enqueue_script(
            's4-app',
            S4_PLUGIN_URL . 'dist/s4.js',
            array(),
            S4_VERSION,
            true
        );
        
        wp_enqueue_style(
            's4-styles',
            S4_PLUGIN_URL . 'dist/s4.css',
            array(),
            S4_VERSION
        );
        
        wp_localize_script('s4-app', 's4Config', array(
            'apiUrl' => rest_url('s4/v1/'),
            'nonce' => wp_create_nonce('wp_rest'),
            'version' => S4_VERSION,
            'isAdmin' => is_admin(),
            'canManage' => current_user_can('manage_options'),
            'isFrontend' => true
        ));
        
        // Output the full-screen HTML page
        ?>
        <!DOCTYPE html>
        <html <?php language_attributes(); ?>>
        <head>
            <meta charset="<?php bloginfo('charset'); ?>">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>S4 Design System - <?php bloginfo('name'); ?></title>
            <?php wp_head(); ?>
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    background: #0a0a0a;
                    color: #ffffff;
                    overflow-x: hidden;
                }
                #s4-frontend-root {
                    width: 100vw;
                    height: 100vh;
                    overflow: auto;
                }
                .s4-fullscreen-header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    height: 60px;
                    background: rgba(10, 10, 10, 0.95);
                    backdrop-filter: blur(10px);
                    border-bottom: 1px solid #333;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0 1.5rem;
                    z-index: 1000;
                }
                .s4-fullscreen-content {
                    margin-top: 60px;
                    min-height: calc(100vh - 60px);
                }
                .s4-logo {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: #d946ef;
                }
                .s4-nav {
                    display: flex;
                    gap: 1rem;
                }
                .s4-nav a {
                    color: #9ca3af;
                    text-decoration: none;
                    padding: 0.5rem 1rem;
                    border-radius: 0.375rem;
                    transition: all 0.2s;
                }
                .s4-nav a:hover {
                    color: #ffffff;
                    background: rgba(255, 255, 255, 0.1);
                }
            </style>
        </head>
        <body>
            <div class="s4-fullscreen-header">
                <div class="s4-logo">S4 Design System</div>
                <div class="s4-nav">
                    <a href="<?php echo admin_url('admin.php?page=s4-dashboard'); ?>">Admin View</a>
                    <a href="<?php echo home_url(); ?>">Back to Site</a>
                </div>
            </div>
            <div class="s4-fullscreen-content">
                <div id="s4-frontend-root"></div>
            </div>
            <s4-element data-mode="frontend"></s4-element>
            <?php wp_footer(); ?>
        </body>
        </html>
        <?php
    }
    
    public function render_web_component() {
        if (is_user_logged_in() && current_user_can('manage_options')) {
            echo '<s4-element></s4-element>';
        }
    }
    
    public function register_rest_routes() {
        register_rest_route('s4/v1', '/config', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_config'),
            'permission_callback' => array($this, 'check_permissions')
        ));
        
        register_rest_route('s4/v1', '/config', array(
            'methods' => 'POST',
            'callback' => array($this, 'save_config'),
            'permission_callback' => array($this, 'check_permissions')
        ));
        
        register_rest_route('s4/v1', '/docs/(?P<folder>[a-zA-Z0-9-_]+)/(?P<file>[a-zA-Z0-9-_.]+)', array(
            'methods' => 'GET',
            'callback' => array($this, 'get_document'),
            'permission_callback' => array($this, 'check_permissions')
        ));
    }
    
    public function check_permissions() {
        return current_user_can('manage_options');
    }
    
    public function get_config() {
        $config = get_option('s4_theme_config', array());
        return rest_ensure_response($config);
    }
    
    public function save_config($request) {
        $config = $request->get_json_params();
        update_option('s4_theme_config', $config);
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
        
        $file_path = S4_PLUGIN_PATH . "PROJECT-DOCS/{$folder}/{$file}";
        
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
new S4Plugin();

// Activation hook to flush rewrite rules
register_activation_hook(__FILE__, function() {
    // Add rewrite rules
    add_rewrite_rule('^s4/?$', 'index.php?s4_page=1', 'top');
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
        'version' => S4_VERSION,
        'initialized' => true,
        'brand' => array(
            'primary' => 'hsla(330, 85%, 60%, 1)',
            'secondary' => 'hsla(25, 95%, 65%, 1)', 
            'neutral' => 'hsla(220, 15%, 25%, 1)',
            'accent' => 'hsla(280, 75%, 70%, 1)'
        ),
        'typography' => array(
            'font-family' => 'system-ui, -apple-system, sans-serif'
        )
    );
    
    add_option('s4_theme_config', $default_config);
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    // Clean up if needed
});

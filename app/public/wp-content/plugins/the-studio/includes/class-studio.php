<?php
namespace Studio;

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Main Studio Plugin Class
 */
class Studio {
    
    /**
     * Plugin instance
     */
    private static $instance = null;
    
    /**
     * Get plugin instance
     */
    public static function instance() {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init_hooks();
        $this->load_dependencies();
    }
    
    /**
     * Initialize hooks
     */
    private function init_hooks() {
        // Admin menu
        add_action('admin_menu', [$this, 'add_admin_menu']);
        
        // Admin scripts and styles
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        
        // REST API
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        
        // Add admin body class
        add_filter('admin_body_class', [$this, 'add_admin_body_class']);
        
        // Add rewrite rule for standalone page
        add_action('init', [$this, 'add_rewrite_rules']);
        
        // Template redirect for standalone page
        add_action('template_redirect', [$this, 'handle_standalone_page']);
        
        // Scripts for standalone page
        add_action('wp_enqueue_scripts', [$this, 'enqueue_standalone_assets']);
        
        // Add admin bar link
        add_action('admin_bar_menu', [$this, 'add_admin_bar_link'], 100);
    }
    
    /**
     * Load dependencies
     */
    private function load_dependencies() {
        // Load API handlers
        require_once STUDIO_PLUGIN_DIR . 'includes/api/class-projects-api.php';
        require_once STUDIO_PLUGIN_DIR . 'includes/api/class-data-manager.php';
    }
    
    /**
     * Add admin menu
     */
    public function add_admin_menu() {
        add_menu_page(
            __('The Studio', 'the-studio'),
            __('The Studio', 'the-studio'),
            'manage_options',
            'the-studio',
            [$this, 'render_admin_page'],
            'dashicons-art',
            30
        );
    }
    
    /**
     * Enqueue admin assets
     */
    public function enqueue_admin_assets($hook) {
        // Only load on our admin page
        if ('toplevel_page_the-studio' !== $hook) {
            return;
        }
        
        // Check if we have built assets (production)
        $dist_dir = STUDIO_PLUGIN_DIR . 'dist/';
        if (file_exists($dist_dir . 'index.js')) {
            // Production assets
            wp_enqueue_script(
                'studio-admin',
                STUDIO_PLUGIN_URL . 'dist/index.js',
                ['wp-element'],
                STUDIO_VERSION,
                true
            );
            
            if (file_exists($dist_dir . 'index.css')) {
                wp_enqueue_style(
                    'studio-admin',
                    STUDIO_PLUGIN_URL . 'dist/index.css',
                    [],
                    STUDIO_VERSION
                );
            }
        } else {
            // Development mode - enqueue Vite dev server
            wp_enqueue_script(
                'studio-admin',
                'http://localhost:5173/src/main.tsx',
                ['wp-element'],
                STUDIO_VERSION,
                true
            );
        }
        
        // Add Montserrat font
        wp_enqueue_style(
            'studio-fonts',
            'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
            [],
            STUDIO_VERSION
        );
        
        // Localize script with data
        wp_localize_script('studio-admin', 'studioData', [
            'apiUrl' => home_url('/wp-json/studio/v2'),
            'nonce' => wp_create_nonce('wp_rest'),
            'uploadUrl' => wp_upload_dir()['baseurl'] . '/studio-data',
            'activeProject' => get_option('studio_active_project', ''),
            'currentUser' => wp_get_current_user()->ID,
            'pluginUrl' => STUDIO_PLUGIN_URL,
            'version' => STUDIO_VERSION,
        ]);
    }
    
    /**
     * Render admin page
     */
    public function render_admin_page() {
        echo '<div id="studio-root" class="studio-admin-wrapper"></div>';
    }
    
    /**
     * Register REST routes
     */
    public function register_rest_routes() {
        $projects_api = new Api\ProjectsAPI();
        $projects_api->register_routes();
    }
    
    /**
     * Add admin body class
     */
    public function add_admin_body_class($classes) {
        if (isset($_GET['page']) && $_GET['page'] === 'the-studio') {
            $classes .= ' studio-admin-page';
        }
        return $classes;
    }
    
    /**
     * Add rewrite rules for standalone page
     */
    public function add_rewrite_rules() {
        add_rewrite_rule('^studio/?$', 'index.php?studio_page=1', 'top');
        add_rewrite_tag('%studio_page%', '([^&]+)');
    }
    
    /**
     * Handle standalone page template
     */
    public function handle_standalone_page() {
        if (get_query_var('studio_page')) {
            // Check if user is logged in and has permissions
            if (!is_user_logged_in() || !current_user_can('manage_options')) {
                wp_redirect(wp_login_url(home_url('/studio/')));
                exit;
            }
            
            // Load standalone template
            include STUDIO_PLUGIN_DIR . 'templates/standalone.php';
            exit;
        }
    }
    
    /**
     * Enqueue assets for standalone page
     */
    public function enqueue_standalone_assets() {
        if (get_query_var('studio_page')) {
            // Check if we have built assets (production)
            $dist_dir = STUDIO_PLUGIN_DIR . 'dist/';
            if (file_exists($dist_dir . 'index.js')) {
                // Production assets
                wp_enqueue_script(
                    'studio-admin',
                    STUDIO_PLUGIN_URL . 'dist/index.js',
                    ['wp-element'],
                    STUDIO_VERSION,
                    true
                );
                
                if (file_exists($dist_dir . 'index.css')) {
                    wp_enqueue_style(
                        'studio-admin',
                        STUDIO_PLUGIN_URL . 'dist/index.css',
                        [],
                        STUDIO_VERSION
                    );
                }
            } else {
                // Development mode - enqueue Vite dev server
                wp_enqueue_script(
                    'studio-admin',
                    'http://localhost:5173/src/main.tsx',
                    ['wp-element'],
                    STUDIO_VERSION,
                    true
                );
            }
            
            // Add Montserrat font
            wp_enqueue_style(
                'studio-fonts',
                'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap',
                [],
                STUDIO_VERSION
            );
            
            // Localize script with data
            wp_localize_script('studio-admin', 'studioData', [
                'apiUrl' => home_url('/wp-json/studio/v2'),
                'nonce' => wp_create_nonce('wp_rest'),
                'uploadUrl' => wp_upload_dir()['baseurl'] . '/studio-data',
                'activeProject' => get_option('studio_active_project', ''),
                'currentUser' => wp_get_current_user()->ID,
                'pluginUrl' => STUDIO_PLUGIN_URL,
                'version' => STUDIO_VERSION,
            ]);
        }
    }
    
    /**
     * Add admin bar link
     */
    public function add_admin_bar_link($wp_admin_bar) {
        if (!current_user_can('manage_options')) {
            return;
        }
        
        $wp_admin_bar->add_node([
            'id' => 'studio-fullscreen',
            'title' => '🎨 Studio Fullscreen',
            'href' => home_url('/studio/'),
            'meta' => [
                'target' => '_blank',
                'title' => 'Open The Studio in fullscreen mode'
            ]
        ]);
    }
}
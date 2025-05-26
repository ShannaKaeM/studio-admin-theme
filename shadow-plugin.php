<?php
/**
 * Plugin Name: Shadow Plugin Boilerplate
 * Description: A WordPress plugin boilerplate with React Shadow DOM architecture and Raycast design system
 * Version: 1.0.0
 * Author: Your Name
 * License: GPL v2 or later
 * Text Domain: shadow-plugin
 * Domain Path: /languages
 *
 * @package ShadowPlugin
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('SHADOW_PLUGIN_VERSION', '1.0.0');
define('SHADOW_PLUGIN_FILE', __FILE__);
define('SHADOW_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('SHADOW_PLUGIN_URL', plugin_dir_url(__FILE__));
define('SHADOW_PLUGIN_BASENAME', plugin_basename(__FILE__));

/**
 * Main Plugin Class
 */
class ShadowPlugin {
    
    /**
     * Single instance of the class
     */
    private static $instance = null;
    
    /**
     * Get single instance
     */
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * Constructor
     */
    private function __construct() {
        $this->init();
    }
    
    /**
     * Initialize the plugin
     */
    private function init() {
        // Hook into WordPress
        add_action('init', [$this, 'onInit']);
        add_action('wp_enqueue_scripts', [$this, 'enqueueAssets']);
        add_action('admin_enqueue_scripts', [$this, 'enqueueAssets']);
        add_action('enqueue_block_editor_assets', [$this, 'enqueueBlockEditorAssets']);
        add_action('rest_api_init', [$this, 'initRestApi']);
        
        // Admin hooks
        add_action('admin_menu', [$this, 'addAdminMenu']);
        
        // Plugin lifecycle hooks
        register_activation_hook(__FILE__, [$this, 'onActivation']);
        register_deactivation_hook(__FILE__, [$this, 'onDeactivation']);
        
        // Load required files
        $this->loadDependencies();
    }
    
    /**
     * Initialize plugin
     */
    public function onInit() {
        // Load text domain
        load_plugin_textdomain('shadow-plugin', false, dirname(SHADOW_PLUGIN_BASENAME) . '/languages');
        
        // Initialize database tables if needed
        $this->initDatabase();
    }
    
    /**
     * Enqueue frontend and admin assets
     */
    public function enqueueAssets() {
        // Enqueue the React build
        $js_file = SHADOW_PLUGIN_DIR . 'dist/js/shadow-plugin.js';
        if (file_exists($js_file)) {
            wp_enqueue_script(
                'shadow-plugin-js',
                SHADOW_PLUGIN_URL . 'dist/js/shadow-plugin.js',
                [],
                filemtime($js_file),
                true
            );
        }
        
        // Localize script with WordPress data
        wp_localize_script('shadow-plugin-js', 'shadowPluginData', [
            'nonce' => wp_create_nonce('shadow_plugin_nonce'),
            'apiUrl' => rest_url('shadow-plugin/v1/'),
            'adminUrl' => admin_url(),
            'pluginUrl' => SHADOW_PLUGIN_URL,
            'isAdmin' => is_admin(),
            'currentUser' => wp_get_current_user()->ID,
            'version' => SHADOW_PLUGIN_VERSION
        ]);
    }
    
    /**
     * Enqueue block editor specific assets
     */
    public function enqueueBlockEditorAssets() {
        // Add Gutenberg-specific integration here
        $this->enqueueAssets();
    }
    
    /**
     * Initialize REST API endpoints
     */
    public function initRestApi() {
        // Register API routes
        register_rest_route('shadow-plugin/v1', '/data', [
            'methods' => 'GET',
            'callback' => [$this, 'apiGetData'],
            'permission_callback' => [$this, 'apiPermissionCheck']
        ]);
        
        register_rest_route('shadow-plugin/v1', '/data', [
            'methods' => 'POST',
            'callback' => [$this, 'apiSaveData'],
            'permission_callback' => [$this, 'apiPermissionCheck']
        ]);
    }
    
    /**
     * API permission check
     */
    public function apiPermissionCheck() {
        return current_user_can('edit_posts');
    }
    
    /**
     * API: Get data
     */
    public function apiGetData($request) {
        // Verify nonce
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new WP_Error('invalid_nonce', 'Invalid nonce', ['status' => 403]);
        }
        
        // Return sample data
        return rest_ensure_response([
            'success' => true,
            'data' => [
                'message' => 'Hello from Shadow Plugin API!'
            ]
        ]);
    }
    
    /**
     * API: Save data
     */
    public function apiSaveData($request) {
        // Verify nonce
        if (!wp_verify_nonce($request->get_header('X-WP-Nonce'), 'wp_rest')) {
            return new WP_Error('invalid_nonce', 'Invalid nonce', ['status' => 403]);
        }
        
        $data = $request->get_json_params();
        
        // Process and save data here
        // Example: update_option('shadow_plugin_data', $data);
        
        return rest_ensure_response([
            'success' => true,
            'message' => 'Data saved successfully'
        ]);
    }
    
    /**
     * Add admin menu
     */
    public function addAdminMenu() {
        add_options_page(
            __('Shadow Plugin Settings', 'shadow-plugin'),
            __('Shadow Plugin', 'shadow-plugin'),
            'manage_options',
            'shadow-plugin-settings',
            [$this, 'renderAdminPage']
        );
    }
    
    /**
     * Render admin page
     */
    public function renderAdminPage() {
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <div id="shadow-plugin-admin-root"></div>
        </div>
        <?php
    }
    
    /**
     * Plugin activation
     */
    public function onActivation() {
        // Create database tables
        $this->createTables();
        
        // Set default options
        add_option('shadow_plugin_version', SHADOW_PLUGIN_VERSION);
        add_option('shadow_plugin_settings', [
            'enabled' => true,
            'api_key' => ''
        ]);
        
        // Flush rewrite rules
        flush_rewrite_rules();
    }
    
    /**
     * Plugin deactivation
     */
    public function onDeactivation() {
        // Clean up if needed
        flush_rewrite_rules();
    }
    
    /**
     * Initialize database
     */
    private function initDatabase() {
        $installed_version = get_option('shadow_plugin_version');
        
        if ($installed_version !== SHADOW_PLUGIN_VERSION) {
            $this->createTables();
            update_option('shadow_plugin_version', SHADOW_PLUGIN_VERSION);
        }
    }
    
    /**
     * Create database tables
     */
    private function createTables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'shadow_plugin_data';
        
        $charset_collate = $wpdb->get_charset_collate();
        
        $sql = "CREATE TABLE $table_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            user_id bigint(20) NOT NULL,
            data_key varchar(255) NOT NULL,
            data_value longtext,
            created_at datetime DEFAULT CURRENT_TIMESTAMP,
            updated_at datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            KEY user_id (user_id),
            KEY data_key (data_key)
        ) $charset_collate;";
        
        require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
        dbDelta($sql);
    }
    
    /**
     * Load required dependencies
     */
    private function loadDependencies() {
        // Load additional PHP classes here
        // require_once SHADOW_PLUGIN_DIR . 'includes/class-api.php';
        // require_once SHADOW_PLUGIN_DIR . 'includes/class-admin.php';
    }
}

// Initialize the plugin
function shadowPlugin() {
    return ShadowPlugin::getInstance();
}

// Start the plugin
shadowPlugin();
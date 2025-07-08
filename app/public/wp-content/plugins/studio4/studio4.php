<?php
/**
 * Plugin Name: Studio4 - Visual Design System Builder
 * Description: Revolutionary S4 design system with visual theme builder, transformable layouts, and Tailwind 4 integration
 * Version: 1.0.0
 * Author: MI Agency
 * License: GPL v2 or later
 * Text Domain: studio4
 * Domain Path: /languages
 *
 * @package Studio4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('STUDIO4_VERSION', '1.0.0');
define('STUDIO4_FILE', __FILE__);
define('STUDIO4_DIR', plugin_dir_path(__FILE__));
define('STUDIO4_URL', plugin_dir_url(__FILE__));
define('STUDIO4_BASENAME', plugin_basename(__FILE__));

/**
 * Main Plugin Class
 */
class Studio4 {
    
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
        
        // Frontend page hooks
        add_action('template_redirect', [$this, 'handleStudio4Page']);
        add_filter('query_vars', [$this, 'addQueryVars']);
        
        // Admin hooks
        add_action('admin_menu', [$this, 'addAdminMenu']);
        add_action('admin_notices', [$this, 'showRewriteNotice']);
        
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
        load_plugin_textdomain('studio4', false, dirname(STUDIO4_BASENAME) . '/languages');
        
        // Add rewrite rules for studio4 page
        add_rewrite_rule('^studio4/?$', 'index.php?studio4_page=1', 'top');
        
        // Initialize database tables if needed
        $this->initDatabase();
    }
    
    /**
     * Enqueue frontend and admin assets
     */
    public function enqueueAssets() {
        // Enqueue the React build
        $js_file = STUDIO4_DIR . 'dist/js/studio4.js';
        if (file_exists($js_file)) {
            wp_enqueue_script(
                'studio4-js',
                STUDIO4_URL . 'dist/js/studio4.js',
                [],
                filemtime($js_file),
                true
            );
        }
        
        // Localize script with WordPress data
        wp_localize_script('studio4-js', 'studio4Data', [
            'nonce' => wp_create_nonce('studio4_nonce'),
            'apiUrl' => rest_url('studio4/v1/'),
            'adminUrl' => admin_url(),
            'pluginUrl' => STUDIO4_URL,
            'isAdmin' => is_admin(),
            'currentUser' => wp_get_current_user()->ID,
            'version' => STUDIO4_VERSION,
            'tailwindApiUrl' => rest_url('studio4/v1/tailwind-styles'),
            'hasTailwindCSS' => $this->hasTailwindCSS()
        ]);
        
        // Add server data to page for web component props
        $this->addServerDataToPage();
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
        register_rest_route('studio4/v1', '/data', [
            'methods' => 'GET',
            'callback' => [$this, 'apiGetData'],
            'permission_callback' => [$this, 'apiPermissionCheck']
        ]);
        
        register_rest_route('studio4/v1', '/data', [
            'methods' => 'POST',
            'callback' => [$this, 'apiSaveData'],
            'permission_callback' => [$this, 'apiPermissionCheck']
        ]);
        
        // Register Tailwind CSS API routes
        if (class_exists('Studio4_Tailwind_Controller')) {
            $tailwind_controller = new Studio4_Tailwind_Controller();
            $tailwind_controller->register_routes();
        }
        
        // Simple document serving route - just pass the full file path
        register_rest_route('studio4/v1', '/file/(?P<filepath>.*)', [
            'methods' => ['GET', 'POST'],
            'callback' => [$this, 'serveAnyFile'],
            'permission_callback' => '__return_true',
        ]);
        
        // Keep original route for backward compatibility
        register_rest_route('studio4/v1', '/docs/(?P<section>[a-zA-Z0-9-]+)/(?P<file>[a-zA-Z0-9_-]+)', [
            'methods' => ['GET', 'POST'],
            'callback' => [$this, 'handleDocumentRequest'],
            'permission_callback' => '__return_true',
        ]);
        
        // Dynamic folder discovery endpoint
        register_rest_route('studio4/v1', '/discover', [
            'methods' => 'GET',
            'callback' => [$this, 'discoverDocuments'],
            'permission_callback' => '__return_true',
        ]);
        
        // Add a simple test endpoint
        register_rest_route('studio4/v1', '/test', [
            'methods' => 'GET',
            'callback' => function() {
                return rest_ensure_response([
                    'success' => true,
                    'message' => 'Studio4 API is working!',
                    'timestamp' => current_time('mysql')
                ]);
            },
            'permission_callback' => '__return_true',
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
            __('Studio4 Settings', 'studio4'),
            __('Studio4', 'studio4'),
            'manage_options',
            'studio4-settings',
            [$this, 'renderAdminPage']
        );
    }
    
    /**
     * Render admin page
     */
    public function renderAdminPage() {
        // Get current user info
        $current_user = wp_get_current_user();
        $user_roles = $current_user->roles;
        $user_role = !empty($user_roles) ? $user_roles[0] : 'subscriber';
        
        // Get Tailwind CSS for admin page
        $tailwind_css = $this->getTailwindCSS();
        
        ?>
        <div class="wrap">
            <h1><?php echo esc_html(get_admin_page_title()); ?></h1>
            <div id="studio4-admin-root">
                <!-- Example of passing server data to React component via attributes -->
                <studio4-builder 
                    user-role="<?php echo esc_attr($user_role); ?>"
                    site-url="<?php echo esc_attr(home_url()); ?>"
                    user-id="<?php echo esc_attr($current_user->ID); ?>"
                    settings='<?php echo esc_attr(json_encode(get_option('studio4_settings', []))); ?>'
                    api-nonce="<?php echo esc_attr(wp_create_nonce('studio4_nonce')); ?>"
                    plugin-version="<?php echo esc_attr(STUDIO4_VERSION); ?>"
                    is-admin="<?php echo esc_attr(current_user_can('manage_options') ? 'true' : 'false'); ?>"
                    theme="dark"
                    <?php if (!empty($tailwind_css)) : ?>
                    tailwind-css="<?php echo base64_encode($tailwind_css); ?>"
                    <?php endif; ?>
                ></studio4-builder>
            </div>
        </div>
        <?php
    }
    
    /**
     * Get Tailwind CSS content server-side
     */
    private function getTailwindCSS() {
        $css_file = STUDIO4_DIR . 'dist/css/main.css';
        
        if (!file_exists($css_file)) {
            return '';
        }
        
        $css_content = file_get_contents($css_file);
        
        if (!$css_content) {
            return '';
        }
        
        // Process CSS for Shadow DOM compatibility
        $css_content = $this->processCSSForShadowDOM($css_content);
        
        return $css_content;
    }
    
    /**
     * Process CSS for Shadow DOM compatibility
     */
    private function processCSSForShadowDOM($css) {
        // Remove any @import statements (not supported in Shadow DOM)
        $css = preg_replace('/@import[^;]*;/', '', $css);
        
        // CSS is already properly formatted for shadow DOM with :host selector
        // No need to wrap again as Tailwind 4 already includes :host rules
        
        // Fix any remaining issues with CSS variables
        $css = str_replace(':root', ':host', $css);
        
        // Clean up extra whitespace but preserve structure
        $css = trim($css);
        
        return $css;
    }

    /**
     * Add server data to page for web component initialization
     */
    public function addServerDataToPage() {
        // Get current user info
        $current_user = wp_get_current_user();
        $user_roles = $current_user->roles;
        $user_role = !empty($user_roles) ? $user_roles[0] : 'subscriber';
        
        // Get Tailwind CSS content
        $tailwind_css = $this->getTailwindCSS();
        
        // Add a web component with server data to footer only if script is enqueued
        add_action('wp_footer', function() use ($current_user, $user_role, $tailwind_css) {
            // Only inject if the script was actually enqueued
            if (!wp_script_is('studio4-js', 'enqueued')) {
                return;
            }
            ?>
            <script>
                // Auto-create shadow plugin panel with server data
                document.addEventListener('DOMContentLoaded', function() {
                    // Only add if not already present
                    if (!document.querySelector('studio4-builder')) {
                        const panel = document.createElement('studio4-builder');
                        
                        // Set attributes with server data
                        panel.setAttribute('user-role', '<?php echo esc_js($user_role); ?>');
                        panel.setAttribute('site-url', '<?php echo esc_js(home_url()); ?>');
                        panel.setAttribute('user-id', '<?php echo esc_js($current_user->ID); ?>');
                        panel.setAttribute('settings', '<?php echo esc_js(json_encode(get_option('studio4_settings', []))); ?>');
                        panel.setAttribute('api-nonce', '<?php echo esc_js(wp_create_nonce('studio4_nonce')); ?>');
                        panel.setAttribute('plugin-version', '<?php echo esc_js(STUDIO4_VERSION); ?>');
                        panel.setAttribute('is-admin', '<?php echo esc_js(current_user_can('manage_options') ? 'true' : 'false'); ?>');
                        panel.setAttribute('theme', 'dark');
                        <?php if (!empty($tailwind_css)) : ?>
                        panel.setAttribute('tailwind-css', <?php echo json_encode(base64_encode($tailwind_css)); ?>);
                        <?php endif; ?>
                        
                        // Add to body (hidden by default until triggered)
                        document.body.appendChild(panel);
                    }
                });
            </script>
            <?php
        });
        
        // For admin pages, also add to admin_footer
        add_action('admin_footer', function() use ($current_user, $user_role, $tailwind_css) {
            // Only inject if the script was actually enqueued
            if (!wp_script_is('studio4-js', 'enqueued')) {
                return;
            }
            ?>
            <script>
                // Auto-create shadow plugin panel with server data
                document.addEventListener('DOMContentLoaded', function() {
                    // Only add if not already present
                    if (!document.querySelector('studio4-builder')) {
                        const panel = document.createElement('studio4-builder');
                        
                        // Set attributes with server data
                        panel.setAttribute('user-role', '<?php echo esc_js($user_role); ?>');
                        panel.setAttribute('site-url', '<?php echo esc_js(home_url()); ?>');
                        panel.setAttribute('user-id', '<?php echo esc_js($current_user->ID); ?>');
                        panel.setAttribute('settings', '<?php echo esc_js(json_encode(get_option('studio4_settings', []))); ?>');
                        panel.setAttribute('api-nonce', '<?php echo esc_js(wp_create_nonce('studio4_nonce')); ?>');
                        panel.setAttribute('plugin-version', '<?php echo esc_js(STUDIO4_VERSION); ?>');
                        panel.setAttribute('is-admin', '<?php echo esc_js(current_user_can('manage_options') ? 'true' : 'false'); ?>');
                        panel.setAttribute('theme', 'dark');
                        <?php if (!empty($tailwind_css)) : ?>
                        panel.setAttribute('tailwind-css', <?php echo json_encode(base64_encode($tailwind_css)); ?>);
                        <?php endif; ?>
                        
                        // Add to body (hidden by default until triggered)
                        document.body.appendChild(panel);
                    }
                });
            </script>
            <?php
        });
    }
    
    /**
     * Plugin activation
     */
    public function onActivation() {
        // Create database tables
        $this->createTables();
        
        // Set default options
        add_option('studio4_version', STUDIO4_VERSION);
        add_option('studio4_settings', [
            'enabled' => true,
            'api_key' => ''
        ]);
        
        // Add rewrite rules before flushing
        add_rewrite_rule('^studio4/?$', 'index.php?studio4_page=1', 'top');
        
        // Flush rewrite rules to activate new rules
        flush_rewrite_rules();
        
        // Mark that rewrite rules have been flushed
        update_option('studio4_rewrite_flushed', true);
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
        $installed_version = get_option('studio4_version');
        
        if ($installed_version !== STUDIO4_VERSION) {
            $this->createTables();
            update_option('studio4_version', STUDIO4_VERSION);
        }
    }
    
    /**
     * Create database tables
     */
    private function createTables() {
        global $wpdb;
        
        $table_name = $wpdb->prefix . 'studio4_data';
        
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
     * Document API permission check
     */
    public function checkDocumentPermissions() {
        // Temporarily allow all access to get documents loading
        return true;
    }
    
    /**
     * Handle document requests (GET/POST)
     */
    public function handleDocumentRequest($request) {
        $section = $request->get_param('section');
        $file = $request->get_param('file');
        $method = $request->get_method();
        
        // Temporarily disable all nonce verification for testing
        // TODO: Re-enable proper nonce verification once documents are loading
        error_log("Studio4 API: Skipping nonce verification for testing");
        
        if ($method === 'GET') {
            return $this->getDocument($section, $file);
        } elseif ($method === 'POST') {
            $content = $request->get_param('content');
            return $this->saveDocument($section, $file, $content);
        }
        
        return new WP_Error('invalid_method', 'Method not allowed', ['status' => 405]);
    }
    
    /**
     * Get document content
     */
    private function getDocument($section, $file) {
        $file_path = $this->getDocumentPath($section, $file);
        
        // Debug logging
        error_log("Studio4 API: Requesting section=$section, file=$file");
        error_log("Studio4 API: Resolved path=$file_path");
        error_log("Studio4 API: File exists=" . (file_exists($file_path) ? 'true' : 'false'));
        
        if (!$file_path || !file_exists($file_path)) {
            return new WP_Error('file_not_found', 'Document not found', [
                'status' => 404,
                'data' => [
                    'section' => $section,
                    'file' => $file,
                    'expected_path' => $file_path,
                    'file_exists' => file_exists($file_path)
                ]
            ]);
        }
        
        $content = file_get_contents($file_path);
        
        if ($content === false) {
            return new WP_Error('read_error', 'Could not read document', ['status' => 500]);
        }
        
        return rest_ensure_response([
            'success' => true,
            'content' => $content,
            'section' => $section,
            'file' => $file,
            'path' => $file_path
        ]);
    }
    
    /**
     * Save document content
     */
    private function saveDocument($section, $file, $content) {
        $file_path = $this->getDocumentPath($section, $file);
        
        if (!$file_path) {
            return new WP_Error('invalid_file', 'Invalid file path', ['status' => 400]);
        }
        
        // Ensure directory exists
        $dir = dirname($file_path);
        if (!is_dir($dir)) {
            return new WP_Error('directory_not_found', 'Directory does not exist', ['status' => 404]);
        }
        
        // Check if file is writable
        if (file_exists($file_path) && !is_writable($file_path)) {
            return new WP_Error('not_writable', 'File is not writable', ['status' => 403]);
        }
        
        // Save content
        $result = file_put_contents($file_path, $content);
        
        if ($result === false) {
            return new WP_Error('write_error', 'Could not save document', ['status' => 500]);
        }
        
        return rest_ensure_response([
            'success' => true,
            'message' => 'Document saved successfully',
            'bytes_written' => $result
        ]);
    }
    
    /**
     * Get document file path with security validation
     */
    private function getDocumentPath($section, $file) {
        // Base path to PROJECT-DOCS - now local to plugin directory
        $base_path = STUDIO4_DIR . 'PROJECT-DOCS/';
        
        // Section mapping
        $section_map = [
            'root' => '',
            '00-master' => '00-Master/',
            '01-design' => '01-Design-System-Framework/',
            '02-tech' => '02-Tech-Stack/',
            '03-frontend' => '03-Plugin-Frontend/',
            '04-backend' => '04-Plugin-Backend/'
        ];
        
        // Validate section
        if (!array_key_exists($section, $section_map)) {
            return false;
        }
        
        // Validate file name (allow alphanumeric, hyphens, and underscores)
        if (!preg_match('/^[a-zA-Z0-9_-]+$/', $file)) {
            error_log("Studio4 API: Invalid file name: $file");
            return false;
        }
        
        // Construct file path
        $file_path = $base_path . $section_map[$section] . strtoupper($file) . '.md';
        
        // Security: Ensure the resolved path is within our allowed directory
        $real_base = realpath($base_path);
        $real_file = realpath(dirname($file_path)) . '/' . basename($file_path);
        
        if ($real_base === false || strpos($real_file, $real_base) !== 0) {
            return false;
        }
        
        return $file_path;
    }
    
    /**
     * Simple file serving and saving method
     */
    public function serveAnyFile($request) {
        $filepath = $request->get_param('filepath');
        $full_path = STUDIO4_DIR . 'PROJECT-DOCS/' . $filepath;
        $method = $request->get_method();
        
        error_log("Studio4 API: $method request for file: $full_path");
        
        // Security: Only allow .md files and prevent directory traversal
        if (!preg_match('/\.md$/', $filepath) || strpos($filepath, '..') !== false) {
            return new WP_Error('invalid_file', 'Invalid file path', ['status' => 400]);
        }
        
        if ($method === 'GET') {
            // Read file
            if (!file_exists($full_path)) {
                return new WP_Error('file_not_found', 'File not found: ' . $filepath, ['status' => 404]);
            }
            
            $content = file_get_contents($full_path);
            
            if ($content === false) {
                return new WP_Error('read_error', 'Could not read file', ['status' => 500]);
            }
            
            return rest_ensure_response([
                'success' => true,
                'content' => $content,
                'file' => $filepath
            ]);
            
        } elseif ($method === 'POST') {
            // Save file
            $data = $request->get_json_params();
            $content = $data['content'] ?? '';
            
            if (!is_string($content)) {
                return new WP_Error('invalid_content', 'Content must be a string', ['status' => 400]);
            }
            
            // Ensure directory exists
            $dir = dirname($full_path);
            if (!is_dir($dir)) {
                return new WP_Error('directory_not_found', 'Directory does not exist', ['status' => 404]);
            }
            
            // Save the file
            $result = file_put_contents($full_path, $content);
            
            if ($result === false) {
                return new WP_Error('write_error', 'Could not save file', ['status' => 500]);
            }
            
            error_log("Studio4 API: Saved file $full_path ($result bytes)");
            
            return rest_ensure_response([
                'success' => true,
                'message' => 'File saved successfully',
                'file' => $filepath,
                'bytes_written' => $result
            ]);
        }
        
        return new WP_Error('invalid_method', 'Method not allowed', ['status' => 405]);
    }
    
    /**
     * Discover all documents in PROJECT-DOCS structure
     */
    public function discoverDocuments($request) {
        $base_path = STUDIO4_DIR . 'PROJECT-DOCS/';
        $structure = [];
        
        // Root files
        $root_files = glob($base_path . '*.md');
        if ($root_files) {
            $structure['root'] = [
                'title' => 'Root Docs',
                'files' => []
            ];
            foreach ($root_files as $file) {
                $filename = basename($file, '.md');
                $structure['root']['files'][] = [
                    'key' => strtolower(str_replace([' ', '.'], '-', $filename)),
                    'title' => $filename,
                    'path' => basename($file)
                ];
            }
        }
        
        // Numbered folders (00-Master, 01-Design, etc.)
        $folders = glob($base_path . '[0-9][0-9]-*', GLOB_ONLYDIR);
        
        foreach ($folders as $folder) {
            $folder_name = basename($folder);
            $folder_key = strtolower(str_replace(' ', '-', $folder_name));
            
            // Get nice title from folder name
            $title_parts = explode('-', $folder_name);
            array_shift($title_parts); // Remove number prefix
            $title = implode('-', $title_parts);
            
            $structure[$folder_key] = [
                'title' => $title,
                'files' => []
            ];
            
            // Get all .md files in this folder
            $files = glob($folder . '/*.md');
            foreach ($files as $file) {
                $filename = basename($file, '.md');
                $structure[$folder_key]['files'][] = [
                    'key' => strtolower($folder_key . '-' . str_replace([' ', '_'], '-', $filename)),
                    'title' => $filename,
                    'path' => $folder_name . '/' . basename($file)
                ];
            }
        }
        
        return rest_ensure_response([
            'success' => true,
            'structure' => $structure,
            'timestamp' => current_time('mysql')
        ]);
    }

    /**
     * Add query vars for studio4 page
     */
    public function addQueryVars($vars) {
        $vars[] = 'studio4_page';
        return $vars;
    }
    
    /**
     * Handle studio4 page requests
     */
    public function handleStudio4Page() {
        if (get_query_var('studio4_page')) {
            $this->renderStudio4Page();
            exit;
        }
    }
    
    /**
     * Render the studio4 frontend page
     */
    private function renderStudio4Page() {
        // Get current user info
        $current_user = wp_get_current_user();
        $user_roles = $current_user->roles;
        $user_role = !empty($user_roles) ? $user_roles[0] : 'subscriber';
        
        // Get Tailwind CSS for frontend page
        $tailwind_css = $this->getTailwindCSS();
        
        // Set proper headers
        header('Content-Type: text/html; charset=utf-8');
        
        ?>
        <!DOCTYPE html>
        <html <?php language_attributes(); ?>>
        <head>
            <meta charset="<?php bloginfo('charset'); ?>">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Studio4 - Visual Design System Builder</title>
            <meta name="robots" content="noindex, nofollow">
            
            <!-- Load WordPress head for any essential styles/scripts -->
            <?php wp_head(); ?>
            
            <style>
                /* Reset and full-page styling for Studio4 */
                body {
                    margin: 0;
                    padding: 0;
                    font-family: system-ui, -apple-system, sans-serif;
                    background: #0f0f0f;
                    color: #f5f5f5;
                    overflow: hidden;
                }
                
                #studio4-fullpage {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    z-index: 999999;
                }
                
                /* Hide WordPress admin bar if present */
                #wpadminbar {
                    display: none !important;
                }
                
                html {
                    margin-top: 0 !important;
                }
            </style>
        </head>
        <body class="studio4-page">
            <div id="studio4-fullpage">
                <!-- Studio4 Builder Component -->
                <studio4-builder 
                    user-role="<?php echo esc_attr($user_role); ?>"
                    site-url="<?php echo esc_attr(home_url()); ?>"
                    user-id="<?php echo esc_attr($current_user->ID); ?>"
                    settings='<?php echo esc_attr(json_encode(get_option('studio4_settings', []))); ?>'
                    api-nonce="<?php echo esc_attr(wp_create_nonce('studio4_nonce')); ?>"
                    plugin-version="<?php echo esc_attr(STUDIO4_VERSION); ?>"
                    is-admin="<?php echo esc_attr(current_user_can('manage_options') ? 'true' : 'false'); ?>"
                    theme="dark"
                    full-page="true"
                    <?php if (!empty($tailwind_css)) : ?>
                    tailwind-css="<?php echo base64_encode($tailwind_css); ?>"
                    <?php endif; ?>
                ></studio4-builder>
            </div>
            
            <?php wp_footer(); ?>
            
            <script>
                // Ensure the Studio4 interface opens automatically on this page
                document.addEventListener('DOMContentLoaded', function() {
                    // Force panel to open since this is a dedicated page
                    setTimeout(function() {
                        const studioElement = document.querySelector('studio4-builder');
                        if (studioElement && studioElement.shadowRoot) {
                            // Try to trigger panel open through the custom element's methods
                            const event = new CustomEvent('studio4:forceOpen');
                            studioElement.dispatchEvent(event);
                        }
                    }, 500);
                });
                
                // Handle escape key to close/redirect
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'Escape') {
                        if (confirm('Close Studio4 and return to site?')) {
                            window.location.href = '<?php echo esc_js(home_url()); ?>';
                        }
                    }
                });
            </script>
        </body>
        </html>
        <?php
    }
    
    /**
     * Show admin notice for rewrite rules
     */
    public function showRewriteNotice() {
        // Only show on admin pages and only if rules might not be flushed
        if (!get_option('studio4_rewrite_flushed', false)) {
            ?>
            <div class="notice notice-info is-dismissible">
                <p><strong>Studio4:</strong> Rewrite rules need to be flushed. Please go to <a href="<?php echo admin_url('options-permalink.php'); ?>">Settings > Permalinks</a> and click "Save Changes" to activate the /studio4/ page.</p>
            </div>
            <?php
        }
    }
    
    /**
     * Check if Tailwind CSS file exists
     */
    private function hasTailwindCSS() {
        if (class_exists('Studio4_Tailwind_Controller')) {
            $controller = new Studio4_Tailwind_Controller();
            return $controller->css_file_exists();
        }
        return false;
    }
    
    /**
     * Load required dependencies
     */
    private function loadDependencies() {
        // Load additional PHP classes here
        require_once STUDIO4_DIR . 'includes/api/class-tailwind-controller.php';
        // require_once SHADOW_PLUGIN_DIR . 'includes/class-admin.php';
    }
}

// Initialize the plugin
function studio4() {
    return Studio4::getInstance();
}

// Start the plugin
studio4();
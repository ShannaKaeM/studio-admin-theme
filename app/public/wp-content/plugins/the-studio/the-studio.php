<?php
/**
 * Plugin Name: The Studio
 * Plugin URI: https://thestudio.design
 * Description: Professional Visual Design System Builder for WordPress
 * Version: 2.0.0
 * Author: The Studio Team
 * Author URI: https://thestudio.design
 * License: GPL v2 or later
 * Text Domain: the-studio
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('STUDIO_VERSION', '2.0.0');
define('STUDIO_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('STUDIO_PLUGIN_URL', plugin_dir_url(__FILE__));
define('STUDIO_PLUGIN_FILE', __FILE__);

// Autoloader for PHP classes
spl_autoload_register(function ($class) {
    $prefix = 'Studio\\';
    $base_dir = STUDIO_PLUGIN_DIR . 'includes/';
    
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';
    
    if (file_exists($file)) {
        require $file;
    }
});

// Initialize the plugin
add_action('plugins_loaded', function() {
    // Load text domain
    load_plugin_textdomain('the-studio', false, dirname(plugin_basename(__FILE__)) . '/languages');
    
    // Initialize main plugin class
    require_once STUDIO_PLUGIN_DIR . 'includes/class-studio.php';
    Studio\Studio::instance();
});

// Activation hook
register_activation_hook(__FILE__, function() {
    // Create upload directory structure
    $upload_dir = wp_upload_dir();
    $studio_dir = $upload_dir['basedir'] . '/studio-data';
    
    if (!file_exists($studio_dir)) {
        wp_mkdir_p($studio_dir);
        
        // Add .htaccess to protect JSON files
        $htaccess_content = "Options -Indexes\n";
        $htaccess_content .= "<FilesMatch '\.(json)$'>\n";
        $htaccess_content .= "Order allow,deny\n";
        $htaccess_content .= "Deny from all\n";
        $htaccess_content .= "</FilesMatch>\n";
        
        file_put_contents($studio_dir . '/.htaccess', $htaccess_content);
    }
    
    // Set default options
    update_option('studio_version', STUDIO_VERSION);
    update_option('studio_active_project', '');
    
    // Add rewrite rules
    add_rewrite_rule('^studio/?$', 'index.php?studio_page=1', 'top');
    add_rewrite_tag('%studio_page%', '([^&]+)');
    
    // Flush rewrite rules
    flush_rewrite_rules();
});

// Deactivation hook
register_deactivation_hook(__FILE__, function() {
    // Clean up transients
    delete_transient('studio_projects_cache');
    
    // Flush rewrite rules
    flush_rewrite_rules();
});
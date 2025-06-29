<?php
/**
 * Studio Admin Theme Functions
 * 
 * Clean Blocksy child theme for Studio Design System testing.
 * NO Studio color overrides - lets Blocksy use natural colors.
 * 
 * @package StudioAdminTheme
 * @version 1.0.0
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

/**
 * Enqueue Parent and Child Theme Styles
 */
function studio_admin_theme_scripts() {
    // Enqueue parent theme styles
    wp_enqueue_style(
        'blocksy-parent-style',
        get_template_directory_uri() . '/style.css',
        array(),
        wp_get_theme()->parent()->get('Version')
    );
    
    // Enqueue child theme styles
    wp_enqueue_style(
        'studio-admin-theme-style',
        get_stylesheet_uri(),
        array('blocksy-parent-style'),
        wp_get_theme()->get('Version')
    );
}
add_action('wp_enqueue_scripts', 'studio_admin_theme_scripts');

/**
 * Add Development Notice for Testing
 */
function studio_admin_theme_dev_notice() {
    // Only show to administrators
    if (!current_user_can('manage_options')) {
        return;
    }
    
    // Only show on admin pages
    if (!is_admin()) {
        return;
    }
    
    // Check if we're on the themes page
    $screen = get_current_screen();
    if ($screen && $screen->id === 'themes') {
        echo '<div class="notice notice-info">';
        echo '<p><strong>Studio Admin Theme Active:</strong> Clean Blocksy child theme for Studio plugin testing. No color overrides - natural Blocksy colors preserved.</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'studio_admin_theme_dev_notice');

/**
 * Theme Setup
 */
function studio_admin_theme_setup() {
    // Add theme support for Studio features (when plugin is installed)
    add_theme_support('studio-design-system');
    
    // Add theme support for responsive embeds
    add_theme_support('responsive-embeds');
    
    // Add theme support for wide alignment
    add_theme_support('align-wide');
}
add_action('after_setup_theme', 'studio_admin_theme_setup');

/**
 * Add Body Classes for Testing
 */
function studio_admin_theme_body_classes($classes) {
    // Add testing environment class
    $classes[] = 'studio-testing-environment';
    
    // Add child theme identifier
    $classes[] = 'studio-admin-theme-active';
    
    // Add Blocksy parent indicator
    $classes[] = 'blocksy-parent-theme';
    
    return $classes;
}
add_filter('body_class', 'studio_admin_theme_body_classes');

/**
 * Child Theme Activation Notice
 */
function studio_admin_theme_activation_notice() {
    if (get_transient('studio_admin_theme_activated')) {
        delete_transient('studio_admin_theme_activated');
        echo '<div class="notice notice-success is-dismissible">';
        echo '<p><strong>Studio Admin Theme Activated!</strong> Clean Blocksy testing environment ready. No Studio color overrides applied.</p>';
        echo '</div>';
    }
}
add_action('admin_notices', 'studio_admin_theme_activation_notice');

/**
 * Set activation transient when theme is switched
 */
function studio_admin_theme_after_switch() {
    set_transient('studio_admin_theme_activated', true, 30);
}
add_action('after_switch_theme', 'studio_admin_theme_after_switch');

/**
 * Add Meta Information
 */
function studio_admin_theme_meta() {
    echo '<meta name="studio-admin-theme" content="1.0.0">' . "\n";
    echo '<meta name="blocksy-child-theme" content="testing-environment">' . "\n";
}
add_action('wp_head', 'studio_admin_theme_meta');

/**
 * NO Customizer Overrides
 * This child theme intentionally avoids adding customizer options
 * to maintain clean Blocksy functionality for testing
 */

/**
 * NO Color Overrides
 * This child theme intentionally avoids color customizations
 * to test Studio plugin coexistence with natural theme colors
 */

/**
 * Development Helper: Show Active Theme Info
 */
function studio_admin_theme_development_info() {
    if (!current_user_can('manage_options') || !WP_DEBUG) {
        return;
    }
    
    $theme = wp_get_theme();
    $parent = $theme->parent();
    
    echo "<!-- Studio Admin Theme Development Info -->\n";
    echo "<!-- Child Theme: " . $theme->get('Name') . " v" . $theme->get('Version') . " -->\n";
    echo "<!-- Parent Theme: " . ($parent ? $parent->get('Name') . " v" . $parent->get('Version') : 'None') . " -->\n";
    echo "<!-- Template: " . $theme->get('Template') . " -->\n";
    echo "<!-- Testing Environment: Clean Blocksy + Studio Plugin Coexistence -->\n";
}
add_action('wp_head', 'studio_admin_theme_development_info');

?>
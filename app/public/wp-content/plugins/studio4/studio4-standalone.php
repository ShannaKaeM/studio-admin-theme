<?php
/**
 * Studio4 Standalone Page
 * 
 * Provides a full-page Studio4 experience without WordPress admin wrapper
 */

// Load WordPress
require_once('../../../../wp-load.php');

// Check if user is logged in and has permissions
if (!is_user_logged_in() || !current_user_can('manage_options')) {
    wp_redirect(wp_login_url());
    exit;
}

// Get the Studio4 instance
$studio4 = Studio4::getInstance();

?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Studio4 - Visual Theme Builder</title>
    <?php 
    // Load only essential WordPress head items
    wp_print_styles();
    wp_print_scripts();
    ?>
    <style>
        body {
            margin: 0;
            padding: 0;
            overflow: hidden;
            background: #0f0f0f;
        }
        #studio4-container {
            width: 100vw;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        studio4-builder {
            width: 100%;
            height: 100%;
        }
    </style>
</head>
<body>
    <div id="studio4-container">
        <?php 
        // Output the Studio4 web component
        echo $studio4->getWebComponent();
        ?>
    </div>
    
    <?php wp_footer(); ?>
</body>
</html>
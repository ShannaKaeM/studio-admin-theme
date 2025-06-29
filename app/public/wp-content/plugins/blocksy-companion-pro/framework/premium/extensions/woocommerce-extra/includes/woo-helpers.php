<?php

namespace Blocksy\Extensions\WoocommerceExtra;

class WooHelpers {
    public function __construct() {
        add_action('init', function() {
            if (
                blocksy_get_theme_mod('woo_shipping_progress_in_checkout', 'no') === 'yes'
                ||
                blocksy_get_theme_mod('checkout_suggested_products', 'yes') === 'yes'
            ) {
                add_action('woocommerce_checkout_order_review', [$this, 'woocommerce_checkout_order_review'], 15);
            }
        });

        add_action(
			'wp_enqueue_scripts',
            [$this, 'enqueue_additional_action_styles']
        );
       

    }

    public function enqueue_additional_action_styles() {
        if (!function_exists('get_plugin_data')) {
            require_once ABSPATH . 'wp-admin/includes/plugin.php';
        }

        $data = get_plugin_data(BLOCKSY__FILE__);

        wp_register_style(
            'blocksy-ext-woocommerce-extra-additional-actions-styles',
            BLOCKSY_URL .
                'framework/premium/extensions/woocommerce-extra/static/bundle/additional-actions.min.css',
            ['blocksy-ext-woocommerce-extra-styles'],
            $data['Version']
        );
        
        if (
            ! is_singular('product')
            ||
            function_exists('blocksy_has_product_specific_layer')
			&&
			! blocksy_has_product_specific_layer('product_actions')
        ) {
            return;
        }

        wp_enqueue_style(
            'blocksy-ext-woocommerce-extra-additional-actions-styles'
        );
    }

    public function woocommerce_checkout_order_review() {
        echo '<div class="ct-order-review-modules">';
        do_action('blocksy:woo:checkout:order-review');
        echo '</div>';
    }
}
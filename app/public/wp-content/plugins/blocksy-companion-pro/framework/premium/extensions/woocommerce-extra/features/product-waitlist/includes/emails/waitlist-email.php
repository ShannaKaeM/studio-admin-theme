<?php

namespace Blocksy\Extensions\WoocommerceExtra;

class WaitlistEmail extends \WC_Email {

	public $content_html;
	public $content_text;

    public function __construct() {
		parent::__construct();

		$this->content_html = $this->get_option('content_html');
		$this->content_text = $this->get_option('content_text');
	}

    public function init_form_fields() {
		parent::init_form_fields();

		unset($this->form_fields['additional_content']);
	}

    public function get_content() {
		$user = get_user_by('email', $this->recipient);
		$product_price = wc_price($this->object->get_price());

		$this->placeholders = array_merge(
			$this->placeholders,
			[
                '{product_title}' => $this->object->get_name(),
				'{product_link}' => esc_url($this->object->get_permalink()),
				'{product_sku}' => $this->object->get_sku(),
				'{product_price}' => $product_price,
				'{add_to_cart_url}' => esc_url(add_query_arg('add-to-cart', $this->object->get_id(), $this->object->get_permalink())),
				'{user_name}' => $user instanceof WP_User ? $user->display_name : esc_html__('Customer', 'blocksy-companion'),
				'{user_email}' => $this->recipient,
            ]
		);

		return parent::get_content();
	}

    public function get_placeholder_text($email_type) {
		$this->placeholders_text = [
            // Default placeholders.
			'site_title',
			'site_address',
			'site_url',

			// Custom placeholders.
			'product_title',
			'product_link',
			'product_sku',
			'product_price',
			'add_to_cart_url',
			'user_name',
			'user_email',
        ];

		if ('html' === $email_type) {
			$this->placeholders_text = array_merge(
				$this->placeholders_text,
				[
                    'product_image',
                ]
			);
		}

		return $this->placeholders_text;
	}

	public static function get_placeholder_text_string($placeholders) {
		$placeholders = array_map(
			function ($placeholder) {
				return blocksy_safe_sprintf(
					'<code>{%s}</code>',
					$placeholder
				);
			},
			$placeholders
		);

		return implode(' ', $placeholders);
	}

    public static function get_unsubscribe_link($product, $user_email) {
		$waitlist = ProductWaitlistDb::get_waitlists_from_db($product, $user_email, '', false);
		$unsubscribe_token = ! empty($waitlist) && isset($waitlist[0]->unsubscribe_token) ? $waitlist[0]->unsubscribe_token : false;

		if (! $unsubscribe_token) {
			$unsubscribe_token = wp_generate_password(24, false);

			ProductWaitlistDb::update_waitlist_data(
				$product,
				$user_email,
				[
                    'unsubscribe_token' => $unsubscribe_token,
                ]
			);
		}

		return add_query_arg(
            [
                'action' => 'blocksy_cancel_subscription',
                'token'  => $unsubscribe_token,
            ],
            $product->get_permalink()
);
	}

    public function get_confirm_subscription_link($product, $user_email) {
		$waitlist = ProductWaitlistDb::get_waitlists_from_db($product, $user_email, '', false);
		$confirm_token = ! empty($waitlist) && isset($waitlist[0]->confirm_token) ? $waitlist[0]->confirm_token : false;

		if (! $confirm_token) {
			$confirm_token = wp_generate_password(24, false);

			ProductWaitlistDb::update_waitlist_data(
				$product,
				$user_email,
				[
                    'confirm_token' => $confirm_token,
                ]
			);
		}

		return add_query_arg(
            [
                'action' => 'blocksy_confirm_subscription',
                'token'  => $confirm_token,
            ],
            $product->get_permalink()
        );
	}

    public function get_user_name($user_email) {
        $user = get_user_by('email', $user_email);

        return isset($user->display_name) && ! empty($user->display_name) ? $user->display_name : esc_html__('Customer', 'blocksy-companion');
    }
}
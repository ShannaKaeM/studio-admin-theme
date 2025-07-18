<?php

if (! isset($device)) {
	$device = 'desktop';
}

$loggedin_account_label_visibility = blocksy_akg(
	'loggedin_account_label_visibility',
	$atts,
	[
		'desktop' => false,
		'tablet' => false,
		'mobile' => false,
	]
);

$loggedin_icon_visibility = blocksy_akg(
	'loggedin_icon_visibility',
	$atts,
	[
		'desktop' => true,
		'tablet' => true,
		'mobile' => true,
	]
);

// Logged in
$loggedin_interaction_type = blocksy_akg('loggedin_interaction_type', $atts, 'dropdown');

if (
	isset($row_id)
	&&
	$row_id === 'offcanvas'
	// ||
	// $device !== 'desktop'
) {
	$loggedin_interaction_type = 'link';
}

$account_link = blocksy_akg('account_link', $atts, 'profile');
$dropdown_html = '';

$link = '#';

if ($loggedin_interaction_type !== 'dropdown') {
	$link = get_edit_profile_url();

	if ($account_link === 'dashboard') {
		$link = admin_url();
	}

	if ($account_link === 'custom') {
		$link = do_shortcode(blocksy_akg('account_custom_page', $atts, ''));
	}

	if ($account_link === 'woocommerce_account' && class_exists('WooCommerce')) {
		$link = get_permalink(get_option('woocommerce_myaccount_page_id'));
	}

	if ($account_link === 'logout') {
		$link = wp_logout_url(blocksy_current_url());
	}

	$link = apply_filters('wpml_permalink', $link);
}

// Media
$media_html = '';
$loggedin_media = blocksy_akg('loggedin_media', $atts, 'avatar');

$avatar_size = intval(
	blocksy_expand_responsive_value(
		blocksy_akg('accountHeaderAvatarSize', $atts, 18)
	)['desktop']
);

if ($loggedin_media === 'avatar') {
	$media_html = blocksy_simple_image(
		blocksy_get_avatar_url([
			'avatar_entity' => $current_user_id,
			'size' => $avatar_size * 2
		]),
		[
			'img_atts' => [
				'width' => $avatar_size,
				'height' => $avatar_size,
				'aria-hidden' => 'true',
			],
		]
	);
}

if ($loggedin_media === 'icon') {
	$media_html = $icon[blocksy_akg('account_loggedin_icon', $atts, 'type-1')];

	if (function_exists('blc_get_icon')) {
		$icon_source = blocksy_default_akg(
			'loggedin_icon_source',
			$atts,
			'default'
		);

		if ($icon_source === 'custom') {
			$media_html = blc_get_icon([
				'icon_descriptor' => blocksy_akg(
					'loggedin_custom_icon',
					$atts,
					['icon' => 'blc blc-user']
				),
				'icon_container' => false,
				'icon_html_atts' => [
					'class' => trim('ct-icon ' . blocksy_visibility_classes($loggedin_icon_visibility))
				]
			]);
		}
	}
}

// Label
$loggedin_label = blocksy_expand_responsive_value(
	blocksy_default_akg('loggedin_label', $atts, __('My Account', 'blocksy-companion'))
)[$device];


$loggedin_label = do_shortcode(
	blocksy_translate_dynamic(
		$loggedin_label,
		$panel_type . ':' . $section_id . ':' . $item_id . ':loggedin_label'
	)
);

if (blocksy_akg('loggedin_text', $atts, 'label') === 'username') {
	$user = wp_get_current_user();
	$loggedin_label = $user->display_name;
}

$loggedin_label_position = blocksy_expand_responsive_value(
	blocksy_akg('loggedin_label_position', $atts, 'left')
);

$attr['data-state'] = 'in';
$attr['data-interaction'] = $loggedin_interaction_type;

$link_attr = [
	'class' => 'ct-account-item',
	'aria-label' => $loggedin_label,
	'href' => $link,
];

$link_tag_name = 'a';

if (! empty($media_html)) {
	$link_attr['data-label'] = $loggedin_label_position[$device];
}

// dropdown menu
if ($loggedin_interaction_type === 'dropdown') {
	$link_tag_name = 'span';

	$link_attr['tabindex'] = '0';

	unset($link_attr['href'], $link_attr['aria-label']);

	$dropdown_html = '';
	$dropdown_items = blocksy_akg('dropdown_items', $atts, [
		[
			'id' => 'user_info',
			'enabled' => true,
		],

		[
			'id' => 'divider',
			'enabled' => true,
		],

		[
			'id' => 'dashboard',
			'enabled' => true,
			'label' => __('Dashboard', 'blocksy-companion'),
		],

		[
			'id' => 'profile',
			'enabled' => true,
			'label' => __('Edit Profile', 'blocksy-companion'),
		],

		[
			'id' => 'logout',
			'enabled' => true,
			'label' => __('Log Out', 'blocksy-companion'),
		],
	]);

	// attr
	//
	// link => false | href
	// link_attr
	//
	// html
	$dropdown_items_descriptors = [
		// [
		// 	'tag_name' => 'div',
		// 	'attr' => [
		// 		'class' => 'ct-account-dropdown-item',
		// 	],

		// 	'link' => false,
		// 	'link_attr' => [],

		// 	'html' => ''
		// ],
	];

	foreach ($dropdown_items as $dropdown_row) {
		if (
			! isset($dropdown_row['enabled'])
			||
			! $dropdown_row['enabled']
		) {
			continue;
		}

		if (isset($dropdown_row['label'])) {
			$dropdown_row['label'] = blocksy_translate_dynamic(
				$dropdown_row['label'],
				$panel_type . ':' . $section_id . ':account:dropdown_items:' . $dropdown_row['id'] . ':label'
			);
		}

		if ($dropdown_row['id'] === 'user_info') {
			$user = wp_get_current_user();
			$user_fistname = '';
			$user_lastname = '';

			if ($user->has_prop('user_firstname')) {
				$user_firstname = $user->get('user_firstname');
			}

			if ($user->has_prop('user_lastname')) {
				$user_lastname = $user->get('user_lastname');
			}

			$user_display_name =
				!empty($user_firstname) || !empty($user_lastname)
				? str_replace(
					['{first_name}', '{last_name}', '{user_name}'],
					[$user_firstname, $user_lastname, $user->display_name],
					blocksy_akg('account_user_info_display_name', $dropdown_row, '{first_name} {last_name}')
				)
				: $user->display_name;

			$image_html = '';

			if (blocksy_akg('has_account_dropdown_avatar', $dropdown_row, 'yes') === 'yes') {
				$image_html = blocksy_simple_image(
					blocksy_get_avatar_url([
						'avatar_entity' => $current_user_id,
						'size' => $avatar_size * 2,
					]),
					[
						'img_atts' => [
							'width' => $avatar_size,
							'height' => $avatar_size,
							'aria-hidden' => 'true',
						],
					]
				);
			}

			$additional_fields_html = '';

			if (
				! empty(blocksy_akg('account_user_info_additional_fields', $dropdown_row, '{user_email}'))
				||
				is_customize_preview()
			) {
				$message = blocksy_akg('account_user_info_additional_fields', $dropdown_row, '{user_email}');
				$message = str_replace('{user_email}', $user->user_email, $message);
				$message = str_replace('{user_name}', $user->display_name, $message);

				$user_role = '';

				if (! empty($user->roles)) {
					$user_role = reset($user->roles);

					global $wp_roles;
					$all_roles = $wp_roles->roles;

					if (isset($all_roles[$user_role])) {
						$user_role = $all_roles[$user_role]['name'];
					}
				}

				$message = str_replace('{user_role}', $user_role, $message);

				$additional_fields_html = blocksy_html_tag(
					'small',
					(
						is_customize_preview() ? [
							'data-email' => $user->user_email,
							'data-name' => $user->display_name,
							'data-role' => $user_role
						] : []
					),
					$message
				);
			}

			$link_source = blocksy_akg('account_user_info_link', $dropdown_row, 'none');
			$custom_link = blocksy_akg('account_user_info_custom_link', $dropdown_row, '#');

			if ($link_source === 'dashboard') {
				$custom_link = get_dashboard_url();
			}

			if ($link_source === 'profile') {
				$custom_link = get_edit_profile_url();
			}

			$profile_html = $image_html . blocksy_html_tag(
				'span',
				[],
				'<b>' . $user_display_name . '</b>' . $additional_fields_html
			);

			$dropdown_item_descriptor = [
				'attr' => [
					'class' => 'menu-item ct-header-account-user-info'
				],

				'html' => $profile_html,

				'link' => false,
				'link_attr' => [
					'class' => 'ct-menu-link'
				],
			];

			if ($link_source !== 'none' && ! empty($custom_link)) {
				$dropdown_item_descriptor['link'] = $custom_link;
			}

			$dropdown_items_descriptors[] = $dropdown_item_descriptor;
		}

		if ($dropdown_row['id'] === 'dashboard') {
			$user = wp_get_current_user();

			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => get_dashboard_url(
					isset($user->ID) ? (int) $user->ID : 0
				),

				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('Dashboard', 'blocksy-companion')
					)
				)
			];
		}

		if ($dropdown_row['id'] === 'divider') {
			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'ct-header-account-divider'
				],
			];
		}

		if ($dropdown_row['id'] === 'profile') {
			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => get_edit_profile_url(),
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('Edit Profile', 'blocksy-companion')
					)
				)
			];
		}

		if ($dropdown_row['id'] === 'logout') {
			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => wp_logout_url(blocksy_current_url()),
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('Log Out', 'blocksy-companion')
					)
				)
			];
		}

		if ($dropdown_row['id'] === 'custom_link') {

			$custom_label = blocksy_default_akg(
				'label',
				$dropdown_row,
				__('Custom Link', 'blocksy-companion')
			);

			$custom_label = blocksy_translate_dynamic(
				$custom_label,
				'header:' . $section_id . ':' . $dropdown_row['__id'] . ':custom_link'
			);

			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => do_shortcode(
					blocksy_default_akg(
						'link',
						$dropdown_row,
						'#'
					)
				),
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode($custom_label)
			];
		}

		if ($dropdown_row['id'] === 'menu') {
			ob_start();

			$menu_to_render = blocksy_expand_responsive_value($dropdown_row['menu']);
			$menu_to_render = $menu_to_render[$device];

			add_filter(
				'nav_menu_item_title',
				'blocksy_handle_nav_menu_item_title',
				10, 4
			);

			wp_nav_menu([
				'container' => false,
				'blocksy_advanced_item' => true,
				'blocksy_mega_menu' => true,
				'blocksy_always_inline' => true,
				'menu' => $menu_to_render,
				'items_wrap' => '%3$s',
			]);

			remove_filter(
				'nav_menu_item_title',
				'blocksy_handle_nav_menu_item_title',
				10, 4
			);

			$menu_content = ob_get_clean();

			$dropdown_items_descriptors[] = [
				'html' => $menu_content
			];
		}

		if ($dropdown_row['id'] === 'woo_account') {
			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => get_permalink(
					get_option('woocommerce_myaccount_page_id')
				),
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('My Account', 'blocksy-companion')
					)
				)
			];
		}

		if (
			$dropdown_row['id'] === 'wishlist'
			&&
			function_exists('wc_get_endpoint_url')
		) {
			$url = wc_get_endpoint_url(
				apply_filters(
					'blocksy:pro:woocommerce-extra:wish-list:slug',
					'woo-wish-list'
				),
				'',
				get_permalink(get_option('woocommerce_myaccount_page_id'))
			);

			$maybe_page_id = blc_theme_functions()->blocksy_get_theme_mod('woocommerce_wish_list_page');

			if (
				! empty($maybe_page_id)
				&&
				blc_theme_functions()->blocksy_get_theme_mod('product_wishlist_display_for', 'logged_users') === 'all_users'
			) {
				$maybe_permalink = get_permalink($maybe_page_id);

				if ($maybe_permalink) {
					$url = $maybe_permalink;
				}
			}

			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => $url,
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('Wishlist', 'blocksy-companion')
					)
				)
			];
		}

		if (
			$dropdown_row['id'] === 'waitlist'
			&&
			function_exists('wc_get_endpoint_url')
		) {
			$url = wc_get_endpoint_url(
				apply_filters(
					'blocksy:pro:woocommerce-extra:waitlist-list:slug',
					'woo-waitlist-list'
				),
				'',
				get_permalink(get_option('woocommerce_myaccount_page_id'))
			);

			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => $url,
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('Waitlist', 'blocksy-companion')
					)
				)
			];
		}

		if (
			$dropdown_row['id'] === 'dokan_dashboard'
			&&
			function_exists('dokan')
		) {
			$user = wp_get_current_user();
			$roles = (array) $user->roles;

			if (in_array('seller', $roles)) {
				$vendor = dokan()->vendor->get($user->ID);
				$url = $vendor->get_dashboard_url();

				if (function_exists('dokan_get_navigation_url')) {
					$url = dokan_get_navigation_url();
				}

				if (! empty($url)) {
					$dropdown_items_descriptors[] = [
						'attr' => [
							'class' => 'menu-item'
						],

						'link' => $url,
						'link_attr' => [
							'class' => 'ct-menu-link'
						],

						'html' => do_shortcode(
							blocksy_default_akg(
								'label',
								$dropdown_row,
								__('Dokan Dashboard', 'blocksy-companion')
							)
						)
					];
				}
			}
		}

		if (
			$dropdown_row['id'] === 'dokan_shop'
			&&
			function_exists('dokan')
		) {
			$user = wp_get_current_user();
			$roles = (array) $user->roles;

			if (in_array('seller', $roles)) {
				$vendor = dokan()->vendor->get($user->ID);
				$url = $vendor->get_shop_url();

				$dropdown_items_descriptors[] = [
					'attr' => [
						'class' => 'menu-item'
					],

					'link' => $url,
					'link_attr' => [
						'class' => 'ct-menu-link'
					],

					'html' => do_shortcode(
						blocksy_default_akg(
							'label',
							$dropdown_row,
							__('Dokan Shop', 'blocksy-companion')
						)
					)
				];
			}
		}

		if (
			$dropdown_row['id'] === 'tutor_lms'
			&&
			function_exists('tutor_utils')
		) {
			$dashboard_page_id = tutor_utils()->get_option(
				'tutor_dashboard_page_id'
			);

			$url = get_permalink($dashboard_page_id);

			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => $url,
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('Tutor LMS Dashboard', 'blocksy-companion')
					)
				)
			];
		}

		if (
			$dropdown_row['id'] === 'bbpress'
			&&
			class_exists('bbPress')
		) {
			$url = bbp_get_user_profile_url(bbp_get_current_user_id()) ;

			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => 'menu-item'
				],

				'link' => $url,
				'link_attr' => [
					'class' => 'ct-menu-link'
				],

				'html' => do_shortcode(
					blocksy_default_akg(
						'label',
						$dropdown_row,
						__('bbPress Dashboard', 'blocksy-companion')
					)
				)
			];
		}

		if (
			$dropdown_row['id'] === 'content-block'
			&&
			! empty($dropdown_row['hook_id'])
			&&
			\Blocksy\Plugin::instance()
				->premium
				->content_blocks
				->is_hook_eligible_for_display($dropdown_row['hook_id'], [
					'match_conditions' => false
				])
		) {
			$classes = 'ct-header-account-content-block';

			$content = $content = \Blocksy\Plugin::instance()
				->premium
				->content_blocks
				->output_hook($dropdown_row['hook_id'], [
					'layout' => false
				]);

			$dropdown_items_descriptors[] = [
				'attr' => [
					'class' => $classes,
					'data-id' => $dropdown_row['__id'],
				],

				'html' => $content
			];
		}
	}

	if (count($dropdown_items_descriptors) > 0) {
		$dropdown_html = [];

		foreach ($dropdown_items_descriptors as $item_descriptor) {
			if (
				! isset($item_descriptor['attr'])
				&&
				isset($item_descriptor['html'])
			) {
				$dropdown_html[] = $item_descriptor['html'];
				continue;
			}

			$li_content = true;

			if (! isset($item_descriptor['attr'])) {
				$item_descriptor['attr'] = [];
			}

			if (isset($item_descriptor['html'])) {
				$li_content = $item_descriptor['html'];
			}

			if (isset($item_descriptor['link'])) {
				if ($item_descriptor['link']) {
					$li_content = blocksy_html_tag(
						'a',
						array_merge(
							[
								'href' => $item_descriptor['link']
							],
							isset($item_descriptor['link_attr'])
							? $item_descriptor['link_attr']
							: []
						),
						$li_content
					);

					$parsed_site_url = wp_parse_url(get_site_url());
					$parsed_url = array_merge(
						$parsed_site_url,
						wp_parse_url($item_descriptor['link'])
					);

					if (rtrim(blc_stringify_url($parsed_url), '/') === rtrim(blocksy_current_url(), '/')) {
						if (! isset($item_descriptor['attr']['class'])) {
							$item_descriptor['attr']['class'] = '';
						}

						$item_descriptor['attr']['class'] = trim(
							$item_descriptor['attr']['class'] . ' current-menu-item'
						);
					}
				} else {
					$li_content = blocksy_html_tag(
						'div',
						isset($item_descriptor['link_attr'])
							? $item_descriptor['link_attr']
							: [],
						$li_content
					);
				}
			}

			$dropdown_html[] = blocksy_html_tag(
				'li',
				$item_descriptor['attr'],
				$li_content
			);
		}

		$dropdown_items_type = blocksy_akg('dropdown_items_type', $atts, 'simple');

		$dropdown_html = blocksy_html_tag(
			'ul',
			[
				'class' => 'ct-header-account-dropdown',
				'data-dropdown' => 'type-1:' . $dropdown_items_type
			],
			implode('', $dropdown_html)
		);
	}

	/*
	if (count($dropdown_items_html) > 0) {
		$dropdown_html = blocksy_html_tag(
			'ul',
			[
				'class' => 'ct-header-account-dropdown',
				'data-dropdown' => 'type-1'
			],
			implode('', $dropdown_items_html)
		);
	}
	 */
}

?>

<div <?php echo blocksy_attr_to_html($attr); ?>>
	<?php
		echo blocksy_html_tag(
			$link_tag_name,
			$link_attr,
			(
				!empty($loggedin_label) ?
				blocksy_html_tag(
					'span',
					[
						'class' => trim('ct-label ' . blocksy_visibility_classes($loggedin_account_label_visibility)),
						'aria-hidden' => 'true',
					],
					$loggedin_label
				) : ''
			) .
			$media_html
		);
	?>

	<?php
		if (!empty($dropdown_html)) {
 			echo $dropdown_html;
 		}
	?>

</div>

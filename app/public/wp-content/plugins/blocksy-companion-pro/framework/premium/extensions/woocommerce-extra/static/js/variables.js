import {
	withKeys,
	handleBackgroundOptionFor,
	typographyOption,
	maybePromoteScalarValueIntoResponsive,
} from 'blocksy-customizer-sync'
import ctEvents from 'ct-events'
import { collectVariablesForCompareLayers } from './sync/compare'

const getSuggestedProductsVariables = () => {
	const prefixes = [
		'cart_popup_suggested_',
		'mini_cart_suggested_',
		'checkout_suggested_',
	]

	const selectors = {
		mini_cart_suggested_: '.ct-suggested-products--mini-cart',
		checkout_suggested_: '.ct-suggested-products--checkout',
		cart_popup_suggested_: '.ct-suggested-products--cart-popup',
	}

	const result = prefixes.reduce((acc, prefix) => {
		const selector = selectors[prefix]

		return {
			...acc,
			[`${prefix}products_columns`]: () => [
				{
					selector,
					variable: 'grid-columns-width',
					responsive: true,
					extractValue: (val) => {
						const responsive =
							maybePromoteScalarValueIntoResponsive(val)

						ctEvents.trigger('blocksy:frontend:init')

						setTimeout(() => {
							const maybeSlider = document.querySelector(selector)

							if (!maybeSlider) {
								return
							}

							if (maybeSlider.flexy) {
								maybeSlider.flexy.scheduleSliderRecalculation()
							}
						}, 50)

						return {
							desktop: `calc(100% / ${responsive.desktop})`,
							tablet: `calc(100% / ${responsive.tablet})`,
							mobile: `calc(100% / ${responsive.mobile})`,
						}
					},
				},
			],

			[`${prefix}products_image_width`]: {
				selector,
				variable: 'product-image-width',
				responsive: true,
				unit: '',
			},

			...typographyOption({
				id: `${prefix}products_title_font`,
				selector: `${selector} [data-products] .ct-product-title`,
			}),

			[`${prefix}products_title_color`]: [
				{
					selector: `${selector} [data-products] .ct-product-title`,
					variable: 'theme-link-initial-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: `${selector} [data-products] .ct-product-title`,
					variable: 'theme-link-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			...typographyOption({
				id: `${prefix}products_price_font`,
				selector: `${selector} [data-products] .price`,
			}),

			[`${prefix}products_price_color`]: {
				selector: `${selector} [data-products] .price`,
				variable: 'theme-text-color',
				type: 'color',
			},

			[`${prefix}products_image_radius`]: {
				selector: `${selector}`,
				type: 'spacing',
				variable: 'theme-border-radius',
				emptyValue: 3,
				responsive: true,
			},
		}
	}, {})

	return result
}

ctEvents.on(
	'ct:customizer:sync:collect-variable-descriptors',
	(allVariables) => {
		allVariables.result = {
			product_compare_layout: collectVariablesForCompareLayers,
			...allVariables.result,
			floatingBarFontColor: {
				selector:
					'.ct-floating-bar .product-title, .ct-floating-bar .price',
				variable: 'theme-text-color',
				type: 'color',
				responsive: true,
			},

			floatingBarBackground: {
				selector: '.ct-floating-bar',
				variable: 'backgroundColor',
				type: 'color',
			},

			...handleBackgroundOptionFor({
				id: 'floatingBarBackground',
				selector: '.ct-floating-bar',
				responsive: true,
			}),

			floatingBarShadow: {
				selector: '.ct-floating-bar',
				type: 'box-shadow',
				variable: 'theme-box-shadow',
				responsive: true,
			},

			floating_bar_position: [
				{
					selector: '.ct-floating-bar',
					variable: 'top-position-override',
					extractValue: (value) => {
						value = value.desktop
							? value
							: {
									desktop: value,
									tablet: value,
									mobile: value,
							  }

						return {
							desktop:
								value.desktop === 'top'
									? 'var(--top-position)'
									: 'var(--false)',

							tablet:
								value.tablet === 'top'
									? 'var(--top-position)'
									: 'var(--false)',

							mobile:
								value.mobile === 'top'
									? 'var(--top-position)'
									: 'var(--false)',
						}
					},
					responsive: true,
				},

				{
					selector: '.ct-floating-bar',
					variable: 'translate-offset',
					extractValue: (value) => {
						value = value.desktop
							? value
							: {
									desktop: value,
									tablet: value,
									mobile: value,
							  }

						return {
							desktop: value.desktop === 'top' ? '-75px' : '75px',
							tablet: value.tablet === 'top' ? '-75px' : '75px',
							mobile: value.mobile === 'top' ? '-75px' : '75px',
						}
					},
					responsive: true,
				},
			],

			// filter canvas
			...typographyOption({
				id: 'filter_panel_widgets_font',
				selector:
					'#woo-filters-panel .ct-widget > *:not(.widget-title)',
			}),

			filter_panel_widgets_font_color: [
				{
					selector: '#woo-filters-panel .ct-sidebar > *',
					variable: 'theme-text-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: '#woo-filters-panel .ct-sidebar',
					variable: 'theme-link-initial-color',
					type: 'color:link_initial',
					responsive: true,
				},

				{
					selector: '#woo-filters-panel .ct-sidebar',
					variable: 'theme-link-hover-color',
					type: 'color:link_hover',
					responsive: true,
				},
			],

			filter_panel_content_vertical_alignment: {
				selector: '#woo-filters-panel',
				variable: 'vertical-alignment',
				responsive: true,
				unit: '',
			},

			// filter type - off-canvas
			filter_panel_width: {
				selector: '#woo-filters-panel[data-behaviour*="side"]',
				variable: 'side-panel-width',
				responsive: true,
				unit: '',
			},

			...handleBackgroundOptionFor({
				id: 'filter_panel_background',
				selector:
					'#woo-filters-panel[data-behaviour*="side"] .ct-panel-inner',
				responsive: true,
			}),

			...handleBackgroundOptionFor({
				id: 'filter_panel_backgrop',
				selector: '#woo-filters-panel[data-behaviour*="side"]',
				responsive: true,
			}),

			filter_panel_close_button_color: [
				{
					selector: '#woo-filters-panel .ct-toggle-close',
					variable: 'theme-icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: '#woo-filters-panel .ct-toggle-close:hover',
					variable: 'theme-icon-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			filter_panel_close_button_border_color: [
				{
					selector:
						'#woo-filters-panel .ct-toggle-close[data-type="type-2"]',
					variable: 'toggle-button-border-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector:
						'#woo-filters-panel .ct-toggle-close[data-type="type-2"]:hover',
					variable: 'toggle-button-border-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			filter_panel_close_button_shape_color: [
				{
					selector:
						'#woo-filters-panel .ct-toggle-close[data-type="type-3"]',
					variable: 'toggle-button-background',
					type: 'color:default',
					responsive: true,
				},

				{
					selector:
						'#woo-filters-panel .ct-toggle-close[data-type="type-3"]:hover',
					variable: 'toggle-button-background',
					type: 'color:hover',
					responsive: true,
				},
			],

			filter_panel_close_button_border_radius: {
				selector: '#woo-filters-panel .ct-toggle-close',
				variable: 'toggle-button-radius',
				unit: 'px',
			},

			filter_panel_close_button_icon_size: {
				selector: '#woo-filters-panel .ct-toggle-close',
				variable: 'theme-icon-size',
				unit: 'px',
			},

			filter_panel_shadow: {
				selector: '#woo-filters-panel[data-behaviour*="side"]',
				forcedOutput: true,
				type: 'box-shadow',
				variable: 'theme-box-shadow',
				responsive: true,
			},

			panel_widgets_spacing: {
				selector: '#woo-filters-panel .ct-sidebar',
				variable: 'sidebar-widgets-spacing',
				responsive: true,
				unit: 'px',
			},

			// filter type - drop-down
			filter_panel_height: {
				selector: '#woo-filters-panel[data-behaviour="drop-down"]',
				variable: 'filter-panel-height',
				responsive: true,
				unit: '',
			},

			filter_panel_columns: [
				{
					selector: '#woo-filters-panel[data-behaviour="drop-down"]',
					variable: 'grid-template-columns',
					responsive: true,
					extractValue: (val) => {
						const responsive =
							maybePromoteScalarValueIntoResponsive(val)

						return {
							desktop: `repeat(${responsive.desktop}, 1fr)`,
							tablet: `repeat(${responsive.tablet}, 1fr)`,
							mobile: `repeat(${responsive.mobile}, 1fr)`,
						}
					},
				},
			],

			// single product share box
			product_share_items_icon_color: [
				{
					selector: '[data-prefix="product"] .ct-share-box',
					variable: 'theme-icon-color',
					type: 'color:default',
				},

				{
					selector: '[data-prefix="product"] .ct-share-box',
					variable: 'theme-icon-hover-color',
					type: 'color:hover',
				},
			],

			// wish list share box
			wish_list_share_box_icon_size: {
				selector: '.ct-woo-account .ct-share-box',
				variable: 'theme-icon-size',
				responsive: true,
				unit: '',
			},

			wish_list_share_box_icons_spacing: {
				selector: '.ct-woo-account .ct-share-box',
				variable: 'items-spacing',
				responsive: true,
				unit: '',
			},

			wish_list_share_items_icon_color: [
				{
					selector: '.ct-woo-account .ct-share-box',
					variable: 'theme-icon-color',
					type: 'color:default',
				},

				{
					selector: '.ct-woo-account .ct-share-box',
					variable: 'theme-icon-hover-color',
					type: 'color:hover',
				},
			],

			// Single product type 2
			product_view_stacked_columns: {
				selector: '.ct-stacked-gallery .ct-stacked-gallery-container',
				variable: 'columns',
				responsive: true,
				unit: '',
			},

			// variation swatches
			archive_color_swatch_size: {
				selector:
					'.ct-card-variation-swatches [data-swatches-type="color"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			single_color_swatch_size: {
				selector: '.variations_form.cart [data-swatches-type="color"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			filter_widget_color_swatch_size: {
				selector: '.ct-filter-widget[data-swatches-type="color"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			archive_image_swatch_size: {
				selector:
					'.ct-card-variation-swatches [data-swatches-type="image"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			single_image_swatch_size: {
				selector: '.variations_form.cart [data-swatches-type="image"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			filter_widget_image_swatch_size: {
				selector: '.ct-filter-widget[data-swatches-type="image"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			archive_button_swatch_size: {
				selector:
					'.ct-card-variation-swatches [data-swatches-type="button"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			single_button_swatch_size: {
				selector: '.variations_form.cart [data-swatches-type="button"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			filter_widget_button_swatch_size: {
				selector: '.ct-filter-widget[data-swatches-type="button"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			archive_mixed_swatch_size: {
				selector:
					'.ct-card-variation-swatches [data-swatches-type="mixed"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			single_mixed_swatch_size: {
				selector: '.variations_form.cart [data-swatches-type="mixed"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			filter_widget_mixed_swatch_size: {
				selector: '.ct-filter-widget[data-swatches-type="mixed"]',
				variable: 'swatch-size',
				responsive: true,
				unit: 'px',
			},

			color_swatch_border_color: [
				{
					selector: '[data-swatches-type="color"] .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:default',
				},

				{
					selector:
						'[data-swatches-type="color"] > *:hover .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:hover',
				},

				{
					selector:
						'[data-swatches-type="color"] > *.active .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:active',
				},
			],

			image_swatch_border_color: [
				{
					selector: '[data-swatches-type="image"] .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:default',
				},

				{
					selector:
						'[data-swatches-type="image"] > *:hover .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:hover',
				},

				{
					selector:
						'[data-swatches-type="image"] > *.active .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:active',
				},
			],

			button_swatch_text_color: [
				{
					selector: '[data-swatches-type="button"] .ct-swatch',
					variable: 'swatch-button-text-color',
					type: 'color:default',
				},

				{
					selector:
						'[data-swatches-type="button"] > *:hover .ct-swatch',
					variable: 'swatch-button-text-color',
					type: 'color:hover',
				},

				{
					selector:
						'[data-swatches-type="button"] > *.active .ct-swatch',
					variable: 'swatch-button-text-color',
					type: 'color:active',
				},
			],

			button_swatch_border_color: [
				{
					selector: '[data-swatches-type="button"] .ct-swatch',
					variable: 'swatch-button-border-color',
					type: 'color:default',
				},

				{
					selector:
						'[data-swatches-type="button"] > *:hover .ct-swatch',
					variable: 'swatch-button-border-color',
					type: 'color:hover',
				},

				{
					selector:
						'[data-swatches-type="button"] > *.active .ct-swatch',
					variable: 'swatch-button-border-color',
					type: 'color:active',
				},
			],

			button_swatch_background_color: [
				{
					selector: '[data-swatches-type="button"] .ct-swatch',
					variable: 'swatch-button-background-color',
					type: 'color:default',
				},

				{
					selector:
						'[data-swatches-type="button"] > *:hover .ct-swatch',
					variable: 'swatch-button-background-color',
					type: 'color:hover',
				},

				{
					selector:
						'[data-swatches-type="button"] > *.active .ct-swatch',
					variable: 'swatch-button-background-color',
					type: 'color:active',
				},
			],

			mixed_swatch_border_color: [
				{
					selector: '[data-swatches-type="mixed"] .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:default',
				},

				{
					selector:
						'[data-swatches-type="mixed"] > *:hover .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:hover',
				},

				{
					selector:
						'[data-swatches-type="mixed"] > *.active .ct-swatch',
					variable: 'swatch-border-color',
					type: 'color:active',
				},
			],

			// shipping progress bar
			shipping_progress_bar_color: [
				{
					selector: '[class*="ct-shipping-progress"]',
					variable: 'product-progress-bar-initial-color',
					type: 'color:default',
					// responsive: true,
				},

				{
					selector: '[class*="ct-shipping-progress"]',
					variable: 'product-progress-bar-active-color',
					type: 'color:active',
					// responsive: true,
				},

				{
					selector: '[class*="ct-shipping-progress"]',
					variable: 'product-progress-bar-active-color-2',
					type: 'color:active_2',
					// responsive: true,
				},
			],

			// stock scarcity bar
			stock_scarcity_bar_height: {
				selector: '.ct-product-stock-scarcity',
				variable: 'product-progress-bar-height',
				responsive: true,
				unit: 'px',
			},

			stock_scarcity_bar_color: [
				{
					selector: '.ct-product-stock-scarcity',
					variable: 'product-progress-bar-initial-color',
					type: 'color:default',
					// responsive: true,
				},

				{
					selector: '.ct-product-stock-scarcity',
					variable: 'product-progress-bar-active-color',
					type: 'color:active',
					// responsive: true,
				},

				{
					selector: '.ct-product-stock-scarcity',
					variable: 'product-progress-bar-active-color-2',
					type: 'color:active_2',
					// responsive: true,
				},
			],

			// new badge
			newBadgeColor: [
				{
					selector: '.ct-woo-badge-new',
					variable: 'badge-text-color',
					type: 'color:text',
				},

				{
					selector: '.ct-woo-badge-new',
					variable: 'badge-background-color',
					type: 'color:background',
				},
			],

			// featured badge
			featuredBadgeColor: [
				{
					selector: '.ct-woo-badge-featured',
					variable: 'badge-text-color',
					type: 'color:text',
				},

				{
					selector: '.ct-woo-badge-featured',
					variable: 'badge-background-color',
					type: 'color:background',
				},
			],

			// quick view
			woocommerce_quick_view_width: {
				selector: '.ct-quick-view-card',
				variable: 'theme-normal-container-max-width',
				responsive: true,
				unit: 'px',
			},

			quick_view_title_color: {
				selector: '.ct-quick-view-card .entry-summary .product_title',
				variable: 'theme-heading-color',
				type: 'color',
			},

			quick_view_price_color: {
				selector: '.ct-quick-view-card .entry-summary .price',
				variable: 'theme-text-color',
				type: 'color',
			},

			quick_view_description_color: {
				selector:
					'.ct-quick-view-card .woocommerce-product-details__short-description',
				variable: 'theme-text-color',
				type: 'color',
			},

			quick_view_add_to_cart_text: [
				{
					selector:
						'.ct-quick-view-card .entry-summary .single_add_to_cart_button',
					variable: 'theme-button-text-initial-color',
					type: 'color:default',
				},

				{
					selector:
						'.ct-quick-view-card .entry-summary .single_add_to_cart_button',
					variable: 'theme-button-text-hover-color',
					type: 'color:hover',
				},
			],

			quick_view_add_to_cart_background: [
				{
					selector:
						'.ct-quick-view-card .entry-summary .single_add_to_cart_button',
					variable: 'theme-button-background-initial-color',
					type: 'color:default',
				},

				{
					selector:
						'.ct-quick-view-card .entry-summary .single_add_to_cart_button',
					variable: 'theme-button-background-hover-color',
					type: 'color:hover',
				},
			],

			quick_view_view_cart_button_text: [
				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-cart-actions .added_to_cart',
					variable: 'theme-button-text-initial-color',
					type: 'color:default',
				},

				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-cart-actions .added_to_cart',
					variable: 'theme-button-text-hover-color',
					type: 'color:hover',
				},
			],

			quick_view_view_cart_button_background: [
				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-cart-actions .added_to_cart',
					variable: 'theme-button-background-initial-color',
					type: 'color:default',
				},

				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-cart-actions .added_to_cart',
					variable: 'theme-button-background-hover-color',
					type: 'color:hover',
				},
			],

			quick_view_product_page_button_text: [
				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-quick-more',
					variable: 'theme-button-text-initial-color',
					type: 'color:default',
				},

				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-quick-more',
					variable: 'theme-button-text-hover-color',
					type: 'color:hover',
				},
			],

			quick_view_product_page_button_background: [
				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-quick-more',
					variable: 'theme-button-background-initial-color',
					type: 'color:default',
				},

				{
					selector:
						'.ct-quick-view-card .entry-summary .ct-quick-more',
					variable: 'theme-button-background-hover-color',
					type: 'color:hover',
				},
			],

			quick_view_shadow: {
				selector: '.ct-quick-view-card',
				type: 'box-shadow',
				variable: 'theme-box-shadow',
			},

			quick_view_radius: {
				selector: '.ct-quick-view-card',
				type: 'spacing',
				variable: 'theme-border-radius',
			},

			...handleBackgroundOptionFor({
				id: 'quick_view_background',
				selector: '.ct-quick-view-card',
			}),

			...handleBackgroundOptionFor({
				id: 'quick_view_backdrop',
				selector: '.quick-view-modal',
			}),

			// added to cart popup
			added_to_cart_popup_image_width: {
				selector: '#ct-added-to-cart-popup',
				variable: 'product-image-width',
				unit: '%',
			},

			...typographyOption({
				id: 'added_to_cart_popup_title_font',
				selector:
					'.ct-added-to-cart-product .woocommerce-loop-product__title',
			}),

			added_to_cart_popup_title_color: {
				selector:
					'.ct-added-to-cart-product .woocommerce-loop-product__title',
				variable: 'theme-heading-color',
				type: 'color',
			},

			...typographyOption({
				id: 'added_to_cart_popup_price_font',
				selector: '.ct-added-to-cart-product .price',
			}),

			added_to_cart_popup_price_color: {
				selector: '.ct-added-to-cart-product .price',
				variable: 'theme-text-color',
				type: 'color',
			},

			added_to_cart_popup_image_radius: {
				selector: '.ct-added-to-cart-product .ct-media-container',
				type: 'spacing',
				variable: 'theme-border-radius',
				emptyValue: 3,
				responsive: true,
			},

			added_to_cart_popup_entrance_speed: {
				selector: '#ct-added-to-cart-popup',
				variable: 'popup-entrance-speed',
				unit: 's',
			},

			added_to_cart_popup_entrance_value: {
				selector: '#ct-added-to-cart-popup',
				variable: 'popup-entrance-value',
				unit: 'px',
			},

			...withKeys(
				[
					'added_to_cart_popup_size',
					'added_to_cart_popup_max_width',
					'added_to_cart_popup_max_height',
				],
				[
					{
						selector:
							'#ct-added-to-cart-popup[data-popup-size="custom"]',
						variable: 'popup-max-width',
						responsive: true,
						unit: '',
						extractValue: () => {
							let added_to_cart_popup_size =
								wp.customize('added_to_cart_popup_size')() ||
								'large'

							if (added_to_cart_popup_size !== 'custom') {
								return 'CT_CSS_SKIP_RULE'
							}

							let added_to_cart_popup_max_width = wp.customize(
								'added_to_cart_popup_max_width'
							)()

							return added_to_cart_popup_max_width
						},
					},

					{
						selector:
							'#ct-added-to-cart-popup[data-popup-size="custom"]',
						variable: 'popup-max-height',
						responsive: true,
						unit: '',
						extractValue: () => {
							let added_to_cart_popup_size =
								wp.customize('added_to_cart_popup_size')() ||
								'large'

							if (added_to_cart_popup_size !== 'custom') {
								return 'CT_CSS_SKIP_RULE'
							}

							let added_to_cart_popup_max_height = wp.customize(
								'added_to_cart_popup_max_height'
							)()

							return added_to_cart_popup_max_height
						},
					},

					{
						selector:
							'#ct-added-to-cart-popup[data-popup-size="custom"]',
						variable: 'popup-height',
						responsive: true,
						unit: '',
						extractValue: () => {
							let added_to_cart_popup_size =
								wp.customize('added_to_cart_popup_size')() ||
								'large'

							if (added_to_cart_popup_size !== 'custom') {
								return 'CT_CSS_SKIP_RULE'
							}

							return '100%'
						},
					},
				]
			),

			...handleBackgroundOptionFor({
				id: 'added_to_cart_popup_background',
				selector: '#ct-added-to-cart-popup .ct-popup-inner > article',
				responsive: true,
			}),

			...handleBackgroundOptionFor({
				id: 'added_to_cart_popup_backdrop_background',
				selector: '#ct-added-to-cart-popup',
				responsive: true,
			}),

			added_to_cart_popup_edges_offset: {
				selector: '#ct-added-to-cart-popup',
				variable: 'popup-edges-offset',
				responsive: true,
				unit: 'px',
			},

			added_to_cart_popup_padding: {
				selector: '#ct-added-to-cart-popup',
				type: 'spacing',
				variable: 'popup-padding',
				responsive: true,
			},

			added_to_cart_popup_border_radius: {
				selector: '#ct-added-to-cart-popup',
				type: 'spacing',
				variable: 'popup-border-radius',
				responsive: true,
			},

			added_to_cart_popup_shadow: {
				selector: '#ct-added-to-cart-popup',
				type: 'box-shadow',
				variable: 'popup-box-shadow',
				responsive: true,
			},

			added_to_cart_popup_close_button_icon_size: {
				selector: '#ct-added-to-cart-popup .ct-toggle-close',
				variable: 'theme-icon-size',
				unit: 'px',
			},

			added_to_cart_popup_close_button_color: [
				{
					selector: '#ct-added-to-cart-popup .ct-toggle-close',
					variable: 'theme-icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: '#ct-added-to-cart-popup .ct-toggle-close:hover',
					variable: 'theme-icon-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			// suggested products
			...getSuggestedProductsVariables(),

			// compare
			compare_modal_shadow: {
				selector: '#ct-compare-modal .ct-container',
				type: 'box-shadow',
				variable: 'theme-box-shadow',
				responsive: true,
			},

			compare_modal_radius: {
				selector: '#ct-compare-modal .ct-container',
				type: 'spacing',
				variable: 'theme-border-radius',
				responsive: true,
			},

			...handleBackgroundOptionFor({
				id: 'compare_modal_background',
				selector: '#ct-compare-modal .ct-container',
				responsive: true,
			}),

			...handleBackgroundOptionFor({
				id: 'compare_modal_backdrop',
				selector: '#ct-compare-modal',
				responsive: true,
			}),

			// compare bar
			...withKeys(
				[
					'product_compare_bar_visibility',
					'product_compare_bar_height',
				],
				{
					selector: '.ct-drawer-canvas[data-compare-bar]',
					variable: 'compare-bar-height',
					responsive: true,
					unit: 'px',
					extractValue: (el) => {
						const product_compare_bar_height = JSON.parse(
							JSON.stringify(
								maybePromoteScalarValueIntoResponsive(
									wp.customize('product_compare_bar_height')()
								)
							)
						)

						let product_compare_bar_visibility = wp.customize(
							'product_compare_bar_visibility'
						)()

						if (!product_compare_bar_visibility.desktop) {
							product_compare_bar_height.desktop = 0
						}

						if (!product_compare_bar_visibility.tablet) {
							product_compare_bar_height.tablet = 0
						}

						if (!product_compare_bar_visibility.mobile) {
							product_compare_bar_height.mobile = 0
						}

						return product_compare_bar_height
					},
				}
			),

			product_compare_bar_button_font_color: [
				{
					selector: '.ct-compare-bar',
					variable: 'theme-button-text-initial-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: '.ct-compare-bar',
					variable: 'theme-button-text-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			product_compare_bar_button_background_color: [
				{
					selector: '.ct-compare-bar',
					variable: 'theme-button-background-initial-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: '.ct-compare-bar',
					variable: 'theme-button-background-hover-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			...handleBackgroundOptionFor({
				id: 'product_compare_bar_background',
				selector: '.ct-compare-bar',
				responsive: true,
			}),

			// size guide
			size_guide_side_panel_width: {
				selector: '#ct-size-guide-modal',
				variable: 'side-panel-width',
				responsive: true,
				unit: '',
			},

			size_guide_modal_radius: {
				selector: '#ct-size-guide-modal .ct-container',
				type: 'spacing',
				variable: 'theme-border-radius',
				responsive: true,
			},

			size_guide_modal_background: [
				...handleBackgroundOptionFor({
					id: 'size_guide_modal_background',
					selector: '#ct-size-guide-modal .ct-container',
					responsive: true,
				}).size_guide_modal_background,

				...handleBackgroundOptionFor({
					id: 'size_guide_modal_background',
					selector: '#ct-size-guide-modal .ct-panel-inner',
					responsive: true,
				}).size_guide_modal_background,
			],

			...handleBackgroundOptionFor({
				id: 'size_guide_modal_backdrop',
				selector: '#ct-size-guide-modal',
				responsive: true,
			}),

			size_guide_modal_shadow: {
				selector: '#ct-size-guide-modal .ct-container',
				type: 'box-shadow',
				variable: 'theme-box-shadow',
				responsive: true,
			},

			size_guide_panel_shadow: {
				selector: '#ct-size-guide-modal .ct-panel-inner',
				type: 'box-shadow',
				variable: 'theme-box-shadow',
				responsive: true,
			},

			size_guide_close_button_icon_size: {
				selector: '#ct-size-guide-modal .ct-toggle-close',
				variable: 'theme-icon-size',
				unit: 'px',
			},

			size_guide_close_button_color: [
				{
					selector: '#ct-size-guide-modal .ct-toggle-close',
					variable: 'theme-icon-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector: '#ct-size-guide-modal .ct-toggle-close:hover',
					variable: 'theme-icon-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			size_guide_close_button_border_color: [
				{
					selector:
						'#ct-size-guide-modal .ct-toggle-close[data-type="type-2"]',
					variable: 'toggle-button-border-color',
					type: 'color:default',
					responsive: true,
				},

				{
					selector:
						'#ct-size-guide-modal .ct-toggle-close[data-type="type-2"]:hover',
					variable: 'toggle-button-border-color',
					type: 'color:hover',
					responsive: true,
				},
			],

			size_guide_close_button_shape_color: [
				{
					selector:
						'#ct-size-guide-modal .ct-toggle-close[data-type="type-3"]',
					variable: 'toggle-button-background',
					type: 'color:default',
					responsive: true,
				},

				{
					selector:
						'#ct-size-guide-modal .ct-toggle-close[data-type="type-3"]:hover',
					variable: 'toggle-button-background',
					type: 'color:hover',
					responsive: true,
				},
			],

			size_guide_close_button_border_radius: {
				selector: '#ct-size-guide-modal .ct-toggle-close',
				variable: 'toggle-button-radius',
				unit: 'px',
			},

			// product archive additional action buttons
			additional_actions_button_icon_color: [
				{
					selector: '.ct-woo-card-extra[data-type="type-1"]',
					variable: 'theme-button-text-initial-color',
					type: 'color:default',
					responsive: true,
				},
				{
					selector: '.ct-woo-card-extra[data-type="type-1"]',
					variable: 'theme-button-text-hover-color',
					type: 'color:hover',
					responsive: true,
				},

				{
					selector: '.ct-woo-card-extra[data-type="type-2"]',
					variable: 'theme-button-text-initial-color',
					type: 'color:default_2',
					responsive: true,
				},
				{
					selector: '.ct-woo-card-extra[data-type="type-2"]',
					variable: 'theme-button-text-hover-color',
					type: 'color:hover_2',
					responsive: true,
				},
			],

			additional_actions_button_background_color: [
				{
					selector: '.ct-woo-card-extra[data-type="type-1"]',
					variable: 'theme-button-background-initial-color',
					type: 'color:default',
					responsive: true,
				},
				{
					selector: '.ct-woo-card-extra[data-type="type-1"]',
					variable: 'theme-button-background-hover-color',
					type: 'color:hover',
					responsive: true,
				},

				{
					selector: '.ct-woo-card-extra[data-type="type-2"]',
					variable: 'theme-button-background-initial-color',
					type: 'color:default_2',
					responsive: true,
				},
				{
					selector: '.ct-woo-card-extra[data-type="type-2"]',
					variable: 'theme-button-background-hover-color',
					type: 'color:hover_2',
					responsive: true,
				},
			],

			woocommerce_related_products_slideshow_columns: [
				{
					selector:
						'.related [data-products], .upsells [data-products]',
					variable: 'grid-columns-width',
					responsive: true,
					extractValue: (val) => {
						const responsive =
							maybePromoteScalarValueIntoResponsive(val)

						ctEvents.trigger('blocksy:frontend:init')
						setTimeout(() => {
							const sliders = document.querySelectorAll(
								'.related .flexy-container, .upsells .flexy-container'
							)

							if (sliders.length) {
								sliders.forEach((slider) => {
									const firstChild = slider.querySelector(
										'.flexy-item:first-child'
									)

									if (slider.flexy) {
										slider.flexy.scheduleSliderRecalculation()
									}
								})
							}
						}, 50)

						return {
							desktop: `calc(100% / ${responsive.desktop})`,
							tablet: `calc(100% / ${responsive.tablet})`,
							mobile: `calc(100% / ${responsive.mobile})`,
						}
					},
				},
			],

			// waitlist
			waitlist_container_max_width: {
				selector: '.ct-product-waitlist',
				variable: 'container-max-width',
				responsive: true,
				unit: '%',
			},

			...typographyOption({
				id: 'waitlist_title_font',
				selector: '.ct-waitlist-title',
			}),

			waitlist_title_color: {
				selector: '.ct-waitlist-title',
				variable: 'theme-heading-color',
				type: 'color',
			},

			...typographyOption({
				id: 'waitlist_message_font',
				selector: '.ct-waitlist-message',
			}),

			waitlist_message_color: {
				selector: '.ct-product-waitlist p',
				variable: 'theme-text-color',
				type: 'color',
			},

			waitlist_form_border: {
				selector: '.ct-product-waitlist',
				variable: 'container-border',
				type: 'border',
				responsive: true,
				skip_none: true,
			},

			...handleBackgroundOptionFor({
				id: 'waitlist_form_background',
				selector: '.ct-product-waitlist',
				responsive: true,
			}),

			waitlist_form_padding: {
				selector: '.ct-product-waitlist',
				type: 'spacing',
				variable: 'container-padding',
				responsive: true,
			},

			waitlist_form_border_radius: {
				selector: '.ct-product-waitlist',
				type: 'spacing',
				variable: 'container-border-radius',
				responsive: true,
			},
		}
	}
)

import {
	setRatioFor,
	responsiveClassesFor,
	getOptionFor,
} from 'blocksy-customizer-sync'

const handleSuggestedProducts = (prefix, container) => {
	if (!container) {
		return
	}

	responsiveClassesFor(`${prefix}products_visibility`, container)

	const flexyItems = container.querySelector('.flexy-items')

	const productsType = getOptionFor(`${prefix}products_type`)
	const imageRatio = getOptionFor(`${prefix}products_image_ratio`)

	if (flexyItems) {
		flexyItems.dataset.products = productsType
		;[...flexyItems.querySelectorAll('.ct-media-container')].map(
			(image) => {
				setRatioFor({
					ratio: imageRatio,
					el: image,
				})
			}
		)
	}

	setTimeout(() => {
		if (container.flexy) {
			container.flexy.scheduleSliderRecalculation()
		}
	}, 50)
}

export const mountSuggestedProductsSync = () => {
	wp.customize.bind('change', (e) => {
		if (!e.id.indexOf('suggested_products')) {
			return
		}

		const selectors = {
			mini_cart_suggested_: '.ct-suggested-products--mini-cart',
			checkout_suggested_: '.ct-suggested-products--checkout',
			cart_popup_suggested_: '.ct-suggested-products--cart-popup',
		}

		Object.keys(selectors).forEach((prefix) => {
			const container = document.querySelector(selectors[prefix])

			if (container) {
				handleSuggestedProducts(prefix, container)
			}
		})
	})
}

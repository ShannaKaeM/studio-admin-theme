import {
	handlePauseClasses,
	handlePlayClasses,
	pauseVideo,
	playVideo,
	muteVideo,
	maybePlayAutoplayedVideo,
	subscribeForStateChanges,
} from '../helpers/video'

import { isIosDevice } from '../helpers/is-ios-device'

import { loadStyle } from '../../helpers'

import { getScalarOrCallback } from '../helpers/get-scalar-or-callback'

const store = {}

const cachedFetch = (url) =>
	store[url]
		? new Promise((resolve) => {
				resolve(store[url])
				store[url] = store[url].clone()
		  })
		: new Promise((resolve) =>
				fetch(url).then((response) => {
					resolve(response)
					store[url] = response.clone()
				})
		  )

export const fetchVideoBy = (mediaId, args = {}) => {
	args = {
		ignoreVideoOptions: false,
		...args,
	}

	let url =
		ct_localizations.ajax_url +
		'?action=blocksy_get_image_video_component&media=' +
		mediaId

	if (args.ignoreVideoOptions) {
		url += '&ignore_video_options=true'
	}

	return new Promise((resolve) => {
		cachedFetch(url).then((r) => {
			if (r.status === 200) {
				r.json().then(({ success, data }) => {
					if (!success) {
						return
					}

					resolve(data)
				})
			}
		})
	})
}

const listenForStateChanges = (videoOrIframe, args = {}) => {
	args = {
		onPause: () => {},
		onPlay: () => {},

		onReady: () => {},

		...args,
	}

	if (videoOrIframe.isListeningForStateChanges) {
		return
	}

	videoOrIframe.isListeningForStateChanges = true

	subscribeForStateChanges(videoOrIframe, (e) => {
		if (e === 'pause') {
			handlePauseClasses(videoOrIframe)
			args.onPause()
		}

		if (e === 'play') {
			args.onPlay()
			handlePlayClasses(videoOrIframe)
		}

		if (e === 'ready') {
			args.onReady()
		}
	})
}

const loadVideoOrIframeViaAjax = (el) => {
	el.querySelector('.ct-video-indicator').classList.add('loading')
	const hasRevert =
		el.dataset.state &&
		el.dataset.state.indexOf('hover') !== -1 &&
		el.dataset.state.indexOf('revert') !== -1

	fetchVideoBy(el.dataset.mediaId).then((data) => {
		const div = document.createElement('div')
		div.innerHTML = data.html
		const insertVideo = div.firstChild
		if (el.querySelector('.ct-dynamic-media-inner')) {
			el.querySelector('.ct-dynamic-media-inner').insertAdjacentElement(
				'beforeend',
				insertVideo
			)
		} else {
			el.insertAdjacentElement('beforeend', insertVideo)
		}

		const videoOrIframe = el.querySelector('video,iframe')
		const flexyContainer = videoOrIframe.closest(
			'.flexy-container[data-autoplay]'
		)
		const flexyInstance = flexyContainer?.flexy

		listenForStateChanges(videoOrIframe, {
			onPlay: () => {
				setTimeout(() => {
					el.querySelector('.ct-video-indicator').classList.remove(
						'loading'
					)
				}, 120)

				if (flexyInstance) {
					flexyInstance.options = {
						...flexyInstance.options,
						autoplay: false,
						_autoplay: false,
					}
				}
			},

			onPause: () => {
				if (flexyInstance) {
					flexyInstance.options = {
						...flexyInstance.options,
						autoplay: parseInt(flexyContainer.dataset.autoplay),
						_autoplay: parseInt(flexyContainer.dataset.autoplay),
					}

					flexyInstance.state = {
						...flexyInstance.state,
						lastTimeAnimated: new Date().getTime(),
					}
				}

				if (
					hasRevert &&
					!el.classList.contains('ct-simplified-player')
				) {
					el.dataset.state = 'hover:paused'
				}
			},

			onReady: () => {
				if (isIosDevice()) {
					muteVideo(videoOrIframe)
				}

				playVideo(videoOrIframe)
			},
		})
	})
}

const loadVideoWithStyles = (el) => {
	const maybeMatchingContainer =
		ct_localizations.dynamic_styles_selectors.find(
			(descriptor) =>
				'.ct-media-container[data-media-id], .ct-dynamic-media[data-media-id]' ===
				descriptor.selector
		)

	if (maybeMatchingContainer) {
		loadStyle(maybeMatchingContainer.url).then(() => {
			loadVideoOrIframeViaAjax(el)
		})
	}
}

ctEvents.on('blocksy:frontend:flexy:slide-change', ({ instance, payload }) => {
	const sliderContainer = getScalarOrCallback(instance.sliderContainer)

	;[...sliderContainer.querySelectorAll('video,iframe')].map(
		(videoOrIframe) => pauseVideo(videoOrIframe)
	)

	const currentSlide = sliderContainer.children[
		payload.currentIndex
	].querySelector(
		'.ct-media-container[data-media-id], .ct-dynamic-media[data-media-id]'
	)

	if (!currentSlide) {
		return
	}

	const maybeVideoOrIframeFromCurrentSlide =
		currentSlide.querySelector('video,iframe')

	if (maybeVideoOrIframeFromCurrentSlide) {
		maybePlayAutoplayedVideo(maybeVideoOrIframeFromCurrentSlide)
		return
	}

	processInitialAutoplayFor(currentSlide, {
		performVisibilityCheck: false,
	})
})

ctEvents.on('blocksy:ajax:filters:done', () => {
	;[...document.querySelectorAll('.ct-media-container[data-media-id]')].map(
		(el) => {
			processInitialAutoplayFor(el)
		}
	)
})

const processInitialAutoplayFor = (el, args = {}) => {
	args = {
		performVisibilityCheck: true,
		...args,
	}

	if (!el.matches('[data-state*="autoplay"]')) {
		return
	}

	let isVisible = true

	if (args.performVisibilityCheck && el.closest('.flexy-items')) {
		const box = el.getBoundingClientRect()
		const parentBox = el.closest('.flexy-items').getBoundingClientRect()

		isVisible =
			box.left >= parentBox.left &&
			box.left <= parentBox.left + parentBox.width &&
			box.top >= parentBox.top &&
			box.top <= parentBox.top + parentBox.height
	}

	if (isVisible) {
		el.removeAttribute('data-state')
		loadVideoWithStyles(el)
	}
}

let mounted = false

export const mount = (el, { event }) => {
	if (!event || event.type === 'scroll') {
		if (mounted) {
			return
		}

		mounted = true

		const cb = () => {
			;[
				...document.querySelectorAll(
					'.ct-media-container[data-media-id], .ct-dynamic-media[data-media-id]'
				),
			].map((el) => {
				processInitialAutoplayFor(el)
			})
		}

		ctEvents.on('blocksy:frontend:init', () => {
			cb()
		})

		cb()

		return
	}

	if (event && event.type === 'mouseover') {
		if (!el.hasMouseLeaveListener) {
			el.hasMouseLeaveListener = true

			el.addEventListener('mouseenter', () => {
				const videoOrIframe = el.querySelector('video,iframe')

				playVideo(videoOrIframe)
			})

			if (el.dataset.state.indexOf('revert') !== -1) {
				el.addEventListener('mouseleave', () => {
					const videoOrIframe = el.querySelector('video,iframe')

					pauseVideo(videoOrIframe, {
						shouldRevert: true,
					})
				})
			}
		}
	}

	const videoOrIframe = el.querySelector('video,iframe')

	if (videoOrIframe) {
		if (el.matches('[data-state="playing"]')) {
			pauseVideo(videoOrIframe)
		} else {
			playVideo(videoOrIframe)
		}

		return
	}

	loadVideoWithStyles(el)
}

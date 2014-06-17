"use strict";

$ = jQuery

@modal = $ '<div/>',
	class: 'light-modal fade'

@modal_dialog = $ '<div/>',
	class: 'modal-dialog'

@modal_container = $ '<div/>',
	class: 'modal-content'

@modal_head = $ '<div/>',
	class: 'modal-header'

@modal_close_button = $ '<button/>',
	type: 'button'
	class: 'close'
	dataDismiss: 'modal'

@modal_close_button
	.html '&times;'

@modal_head_title = $ '<h4/>'
@modal_head_title
	.text 'teest'

@modal_head
	.append @modal_close_button

@modal_head
	.append @modal_head_title

@modal_body = $ '<div/>',
	class: 'modal-body'
@modal_container
	.append @modal_head

@modal_container
	.append @modal_body

@modal_dialog
	.append @modal_container
@modal
	.append @modal_dialog

$ 'body'
	.append @modal

@modal
	.modal
		show: false
		keyboard: true


ModelLightbox = ( element, options ) ->

	@options = $.extend({
		title : null
		source : null
	}, $.fn.bsLightbox.defaults, options || {})

	@$element = $ element



	@modal
		.on 'show.bs.modal', @options.onShow.bind(@)
		.on 'shown.bs.modal', =>
			@modal_shown()
			@options.onShown.call(@)
		.on 'hide.bs.modal', @options.onHide.bind(@)
		.on 'hidden.bs.modal', =>
			if @gallery
				$ document
					.off 'keydown.ekkoLightbox'
				do @modal.remove
			@options.onHidden.call @
		.modal 'show', options
	@modal

$.fn.bsLightbox = ( options ) ->
	@each ->
		$this = $(this)
		options = $.extend({
			source : $this.attr('href')
			type : $this.attr('data-type')
		}, options, $this.data())
		new ModelLightbox(@, options)
		@

$.fn.bsLightbox.defaults =
	gallery_parent_selector: '*:not(.row)'
	left_arrow_class: '.glyphicon .glyphicon-chevron-left'
	right_arrow_class: '.glyphicon .glyphicon-chevron-right'
	type: null
	onShow : ->
	onShown : ->
	onHide : ->
	onHidden : ->

$ '*[data-toggle="lightbox"]'
	.each (id, element) ->
		$ element
			.bsLightbox()
		return
"use strict";

$ = jQuery

Lightbox =
	images: {}
	options: {}
	modal: null
	modal_title: null
	modal_container: null
	modal_setTitle: (title) ->
		if title?
			@.modal
				.find '.modal-title'
				.show()
				.text title
		else			
			@.modal
				.find '.modal-title'
				.hide()
		return

	_bind: (element) ->
		element
			.click (event) ->
				do event.preventDefault
				Lightbox._open this
		return @

	_bindGallery: () ->
		$images = @.images
		@.modal
			.find '.modal-switcher a'
			.click (event) ->
				do event.preventDefault
				$this = $ this				
				$current = null
				for image in $images
					if $(image).hasClass('active') is on
						$current = $(image)
				$next = $images.next()
				$prev = $images.prev()


				if $next.hasClass('active') is on
					$next = $images.first()
				if $prev.hasClass('active') is on
					$prev = $images.last()

				if $this.is('.pull-left')
					if $current?
						$current.removeClass('active').fadeOut(250, (->
							$prev.addClass('active').fadeIn(250)
						))
						Lightbox.modal_setTitle $prev.attr('title')
				else
					if $current?
						$current.removeClass('active').fadeOut(250, (->
							$next.addClass('active').fadeIn(250)
						))
						Lightbox.modal_setTitle $next.attr('title')

				return
		return @
	_unbindGallery: () ->
		@.modal
			.find '.modal-switcher a'
			.unbind 'click'
			.off()
		return @

	_create: (source, options) ->
		@._setOptions options
		return @
	_open: (element, event) ->
		if @._hasGallery(element) is on
			@._makeGallery element
		else
			@._makeSingle element
		return @
	_makeSingle: (element) ->
		do @._unbindGallery
		element = $ element
		source = element
			.data 'remote'
		title = element
			.data 'title'

		@.modal
			.find '.modal-switcher'
			.hide()

		@.modal_setTitle title

		img = $ '<img/>',
			src: source
			title: title
			alt: ''
			width: '100%'

		@.modal
			.find '.modal-images'
			.empty()
			.append img

		@.modal
			.modal 'show'
		return @
	_makeGallery: (element) ->
		element = $ element

		src = element
			.data 'remote'
		title = element
			.data 'title'

		@.modal_setTitle title

		galleryName = element
			.data 'gallery'

		images = $ '[data-gallery="' + galleryName + '"]'

		@.modal
			.find '.modal-images'
			.empty()

		for image in images
			image = $ image
			source = image
				.data 'remote'
			title = image
				.data 'title'
			img = $ '<img/>',
				src: source
				title: title
				alt: ''
				width: '100%'
				class: 'active' if source is src
			@.modal
				.find '.modal-images'
				.append img


		images = @.modal
			.find 'img'

		images.not('.active').hide()

		@.modal
			.find '.modal-switcher'
			.show()

		@.images = images

		do @._bindGallery

		@.modal
			.modal 'show'

		return @

	_hasGallery: (target) ->
		galleryName = $ target
			.data 'gallery'
		return false if galleryName is undefined

		elements = $ '*[data-gallery="' + galleryName + '"]'

		return if elements.length > 1 then true else false

	_setOptions: (options) ->
		@.options = $.extend({
			title : null
			source : null
		}, $.fn.bsLightbox.defaults, options || {})
		return @

	_makeModal: () ->
		template = '<div class="lightbox-modal modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">'
		template += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
		template += '<h4 class="modal-title">title</h4>'
		template += '</div><div class="modal-body">'
		template += '<div class="modal-images"></div><div class="modal-switcher">'
		template += '<a href="#" class="pull-left"><i class="glyphicon glyphicon-chevron-left"></i></a>'
		template += '<a href="#" class="pull-right"><i class="glyphicon glyphicon-chevron-right"></i></a>'
		template += '</div>'
		template += '</div></div></div></div>'


		@modal = $ template

		$ 'body'
			.append @modal

		@modal
			.modal
				show: false
				keyboard: true
		return @modal

do Lightbox._makeModal

$.fn.bsLightbox = ( options ) ->
	@each ->
		$this = $(this)
		options = $.extend({
			source : $this.attr('data-remote')
			type : $this.attr('data-type')
		}, options, $this.data())
		Lightbox._create @, options
		Lightbox._bind $this
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
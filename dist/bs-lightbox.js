"use strict";
var $, Lightbox;

$ = jQuery;

Lightbox = {
  images: {},
  options: {},
  modal: null,
  modal_title: null,
  modal_container: null,
  modal_setTitle: function(title) {
    if (title != null) {
      this.modal.find('.modal-title').show().text(title);
    } else {
      this.modal.find('.modal-title').hide();
    }
  },
  _bind: function(element) {
    element.click(function(event) {
      event.preventDefault();
      return Lightbox._open(this);
    });
    return this;
  },
  _bindGallery: function() {
    var $images;
    $images = this.images;
    this.modal.find('.modal-switcher a').click(function(event) {
      var $current, $next, $prev, $this, image, _i, _len;
      event.preventDefault();
      $this = $(this);
      $current = null;
      for (_i = 0, _len = $images.length; _i < _len; _i++) {
        image = $images[_i];
        if ($(image).hasClass('active') === true) {
          $current = $(image);
        }
      }
      $next = $images.next();
      $prev = $images.prev();
      if ($next.hasClass('active') === true) {
        $next = $images.first();
      }
      if ($prev.hasClass('active') === true) {
        $prev = $images.last();
      }
      if ($this.is('.pull-left')) {
        if ($current != null) {
          $current.removeClass('active').fadeOut(250, (function() {
            return $prev.addClass('active').fadeIn(250);
          }));
          Lightbox.modal_setTitle($prev.attr('title'));
        }
      } else {
        if ($current != null) {
          $current.removeClass('active').fadeOut(250, (function() {
            return $next.addClass('active').fadeIn(250);
          }));
          Lightbox.modal_setTitle($next.attr('title'));
        }
      }
    });
    return this;
  },
  _unbindGallery: function() {
    this.modal.find('.modal-switcher a').unbind('click').off();
    return this;
  },
  _create: function(source, options) {
    this._setOptions(options);
    return this;
  },
  _open: function(element, event) {
    if (this._hasGallery(element) === true) {
      this._makeGallery(element);
    } else {
      this._makeSingle(element);
    }
    return this;
  },
  _makeSingle: function(element) {
    var img, source, title;
    this._unbindGallery();
    element = $(element);
    source = element.data('remote');
    title = element.data('title');
    this.modal.find('.modal-switcher').hide();
    this.modal_setTitle(title);
    img = $('<img/>', {
      src: source,
      title: title,
      alt: '',
      width: '100%'
    });
    this.modal.find('.modal-images').empty().append(img);
    this.modal.modal('show');
    return this;
  },
  _makeGallery: function(element) {
    var galleryName, image, images, img, source, src, title, _i, _len;
    element = $(element);
    src = element.data('remote');
    title = element.data('title');
    this.modal_setTitle(title);
    galleryName = element.data('gallery');
    images = $('[data-gallery="' + galleryName + '"]');
    this.modal.find('.modal-images').empty();
    for (_i = 0, _len = images.length; _i < _len; _i++) {
      image = images[_i];
      image = $(image);
      source = image.data('remote');
      title = image.data('title');
      img = $('<img/>', {
        src: source,
        title: title,
        alt: '',
        width: '100%',
        "class": source === src ? 'active' : void 0
      });
      this.modal.find('.modal-images').append(img);
    }
    images = this.modal.find('img');
    images.not('.active').hide();
    this.modal.find('.modal-switcher').show();
    this.images = images;
    this._bindGallery();
    this.modal.modal('show');
    return this;
  },
  _hasGallery: function(target) {
    var elements, galleryName;
    galleryName = $(target).data('gallery');
    if (galleryName === void 0) {
      return false;
    }
    elements = $('*[data-gallery="' + galleryName + '"]');
    if (elements.length > 1) {
      return true;
    } else {
      return false;
    }
  },
  _setOptions: function(options) {
    this.options = $.extend({
      title: null,
      source: null
    }, $.fn.bsLightbox.defaults, options || {});
    return this;
  },
  _makeModal: function() {
    var template;
    template = '<div class="lightbox-modal modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header">';
    template += '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>';
    template += '<h4 class="modal-title">title</h4>';
    template += '</div><div class="modal-body">';
    template += '<div class="modal-images"></div><div class="modal-switcher">';
    template += '<a href="#" class="pull-left"><i class="glyphicon glyphicon-chevron-left"></i></a>';
    template += '<a href="#" class="pull-right"><i class="glyphicon glyphicon-chevron-right"></i></a>';
    template += '</div>';
    template += '</div></div></div></div>';
    this.modal = $(template);
    $('body').append(this.modal);
    this.modal.modal({
      show: false,
      keyboard: true
    });
    return this.modal;
  }
};

Lightbox._makeModal();

$.fn.bsLightbox = function(options) {
  return this.each(function() {
    var $this;
    $this = $(this);
    options = $.extend({
      source: $this.attr('data-remote'),
      type: $this.attr('data-type')
    }, options, $this.data());
    Lightbox._create(this, options);
    Lightbox._bind($this);
    return this;
  });
};

$.fn.bsLightbox.defaults = {
  gallery_parent_selector: '*:not(.row)',
  left_arrow_class: '.glyphicon .glyphicon-chevron-left',
  right_arrow_class: '.glyphicon .glyphicon-chevron-right',
  type: null,
  onShow: function() {},
  onShown: function() {},
  onHide: function() {},
  onHidden: function() {}
};

$('*[data-toggle="lightbox"]').each(function(id, element) {
  $(element).bsLightbox();
});

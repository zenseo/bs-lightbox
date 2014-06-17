"use strict";
var $, ModelLightbox;

$ = jQuery;

this.modal = $('<div/>', {
  "class": 'light-modal fade'
});

this.modal_dialog = $('<div/>', {
  "class": 'modal-dialog'
});

this.modal_container = $('<div/>', {
  "class": 'modal-content'
});

this.modal_head = $('<div/>', {
  "class": 'modal-header'
});

this.modal_close_button = $('<button/>', {
  type: 'button',
  "class": 'close',
  dataDismiss: 'modal'
});

this.modal_close_button.html('&times;');

this.modal_head_title = $('<h4/>');

this.modal_head_title.text('teest');

this.modal_head.append(this.modal_close_button);

this.modal_head.append(this.modal_head_title);

this.modal_body = $('<div/>', {
  "class": 'modal-body'
});

this.modal_container.append(this.modal_head);

this.modal_container.append(this.modal_body);

this.modal_dialog.append(this.modal_container);

this.modal.append(this.modal_dialog);

$('body').append(this.modal);

this.modal.modal({
  show: false,
  keyboard: true
});

ModelLightbox = function(element, options) {
  this.options = $.extend({
    title: null,
    source: null
  }, $.fn.bsLightbox.defaults, options || {});
  this.$element = $(element);
  this.modal.on('show.bs.modal', this.options.onShow.bind(this)).on('shown.bs.modal', (function(_this) {
    return function() {
      _this.modal_shown();
      return _this.options.onShown.call(_this);
    };
  })(this)).on('hide.bs.modal', this.options.onHide.bind(this)).on('hidden.bs.modal', (function(_this) {
    return function() {
      if (_this.gallery) {
        $(document).off('keydown.ekkoLightbox');
        _this.modal.remove();
      }
      return _this.options.onHidden.call(_this);
    };
  })(this)).modal('show', options);
  return this.modal;
};

$.fn.bsLightbox = function(options) {
  return this.each(function() {
    var $this;
    $this = $(this);
    options = $.extend({
      source: $this.attr('href'),
      type: $this.attr('data-type')
    }, options, $this.data());
    new ModelLightbox(this, options);
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

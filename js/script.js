
/**
 *  @name plugin
 *  @description description
 *  @version 1.0
 *  @options
 *    option
 *  @events
 *    event
 *  @methods
 *    init
 *    publicMethod
 *    destroy
 */
;(function($, window, undefined) {
  'use strict';

  var pluginName = 'menu-dropdown';
  var doc = $(document);
  var body = $('body');
  function Plugin(element, options) {
    this.element = $(element);
    this.options = $.extend({}, $.fn[pluginName].defaults, this.element.data(), options);
    this.init();
  }

  Plugin.prototype = {
    init: function() {
      var that = this,
          el = that.element,
          opts = that.options;

      that.btnMenu = el.find(opts.btnMenu);
      that.menuEl = el.find(opts.menuEl);
      that.btnClose = el.find(opts.btnClose);
      that.menuDropdown = el.find(opts.menuDropdown);
      that.menuParent = el.find(opts.menuParent);
      that.menuE1 = that.menuEl.find(opts.classMenu1);

      that.btnMenu.on('click.' +pluginName, function(){
        body.css({'padding-right': window.innerWidth - doc.width()});
        body.addClass(opts.classBodyOverflow);
        that.menuParent.addClass(opts.menuAuto);
        that.menuEl.addClass(opts.classMenuWidth);
        
      });

      that.menuDropdown.on('click.' +pluginName, function(){
        var self = $(this);
        self.parents(opts.classMenuSub).siblings().find(opts.classMenu1).slideUp();
        self.parents('li').siblings('li').find('a').removeClass(opts.classAnimateIcon);
        self.siblings('ul').slideToggle('fast', function(){
          self.toggleClass(opts.classAnimateIcon);
        });
      });

      doc.on('click.' +pluginName, function(e){
        var target = $(e.target);
        if (target.closest(that.btnClose).length || (!target.closest(that.menuEl).length && 
        !target.closest(that.btnMenu).length)){
          that.menuParent.removeClass(opts.menuAuto);
          body.css({'padding-right': 0});
          body.removeClass(opts.classBodyOverflow);
          that.menuE1.slideUp();
          that.menuDropdown.removeClass(opts.classAnimateIcon);
          that.menuEl.removeClass(opts.classMenuWidth);

        }
      });

      // fixed background-attachment in IE
      if(navigator.userAgent.match(/Trident\/7\./)) {
        document.body.addEventListener("mousewheel", function(event) {
          event.preventDefault();
          var wd = event.wheelDelta;
          var csp = window.pageYOffset;
          window.scrollTo(0, csp - wd);
        });
      }
    },
    destroy: function() {
      $.removeData(this.element[0], pluginName);
    }
  };

  $.fn[pluginName] = function(options, params) {
    return this.each(function() {
      var instance = $.data(this, pluginName);
      if (!instance) {
        $.data(this, pluginName, new Plugin(this, options));
      } else if (instance[options]) {
        instance[options](params);
      }
    });
  };

  $.fn[pluginName].defaults = {
  };

  $(function() {
    $('[data-' + pluginName + ']')[pluginName]({
      btnMenu: '[data-btn-menu]',
      menuEl: '[data-menu-content]',
      btnClose : '[data-close]',
      menuDropdown: '[data-dropdown]',
      classMenuWidth: 'menu-width',
      classBodyOverflow : 'body-overflow',
      classAnimateIcon: 'animation-icon',
      classMenuSub: '.menu-sub',
      classMenu1: '.menu-1',
      menuParent: '.menu-parent',
      menuAuto: 'menu-overflow'
    });
  });

}(jQuery, window));
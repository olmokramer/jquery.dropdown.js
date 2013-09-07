"use strict";
(function($) {
	$.fn.jqDropdown = function(options) {
		var config = $.extend({}, $.fn.jqDropdown.defaults, options);

		return this.each(function() {
			$(this).jqDropdownApplyDropdown(config);
		});
	};

	$.fn.jqDropdownApplyDropdown = function(config) {
		return $(this)
			.jqDropdownAddClasses(config)
			.jqDropdownAddEventListeners(config);
	};

	$.fn.jqDropdownAddClasses = function(config) {
		$(this)
			.addClass("jqdropdown")
			.find(config.listSelector)
			.addClass("jqdropdown-list")
			.css({
				top: config.listTop,
				left: config.listLeft
			})
			.find(config.listItemSelector)
			.addClass("jqdropdown-list-item")
		return $(this);
	};

	$.fn.jqDropdownAddEventListeners = function(config) {
		$(this)
			.on({
				mouseenter: function() {
					$(this).jqDropdownMouseenter(config);
				},
				mouseleave: function() {
					$(this).jqDropdownMouseleave(config);
				},
			})
			.on("click", ".jqdropdown-list-item", config.click);
	};

	$.fn.jqDropdownMouseenter = function(config) {
		config.openlist($(this).addClass("jqdropdown-open"));
		config.closelist($(this).siblings(".jqdropdown-open"));
	}

	$.fn.jqDropdownMouseleave = function(config) {
		var list = this;
		var t = setTimeout(function() {
			config.closelist($(list).removeClass("jqdropdown-open"));
		}, config.closeTimeout);

		$(this).on("mouseenter", function clearCloseTimeout() {
			clearTimeout(t);
			$(this).off("mouseenter", clearCloseTimeout);
		});
	}

	$.fn.jqDropdown.defaults = {
		listSelector : "ul, ol",
		listItemSelector : "*",
		listLeft : 0,
		listTop : 0,
		openlist : null,
		closelist : null,
		click : null,
		closeTimeout : 0
	};

	$.fn.jqDropdown.defaults.openlist = function(list) {
		$(list)
			.find(".jqdropdown-list-item")
			.show();
	}

	$.fn.jqDropdown.defaults.closelist = function(list) {
		$(list)
			.find(".jqdropdown-list-item")
			.hide();
	}

	$.fn.jqDropdown.defaults.click = function() {}

})(jQuery);

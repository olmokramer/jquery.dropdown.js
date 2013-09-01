"use strict";
(function($) {

	/**
	@author: Olmo Kramer
	@description: jQuery plugin to easily add dropdown effect to list-like items
	 */

	$.fn.dropdownApplyDropdown = function(config) {
		return $(this)
			.dropdownAddClasses(config)
			.dropdownAttachEvents(config)
			.dropdownApplyWrappers(config);
	}

	$.fn.dropdownAddClasses = function(config) {
		return $(this)
			.addClass("dropdown")
			.find(config.listSelector)
			.addClass("dropdown-list")
			.find(config.listItemSelector)
			.each(function() {
				$(this).addClass("dropdown-list-item");
			})
			.parent()
			.parent();
	}

	$.fn.dropdownAttachEvents = function(config) {
		return $(this)
			.on({
				mouseenter: function() {
					$(this).dropdownOnMouseEntersList(config);
				},
				mouseleave: function() {
					$(this).dropdownOnMouseLeavesList(config);
				}
			});
	}

	$.fn.dropdownApplyWrappers = function(config) {
		// find list;
		var list = $("<div>")
			.addClass("dropdown-list-wrapper")
			.html($(this)
				.find(config.listSelector)
				.remove());

		//find title
		$(this)
			.find(config.listSelector)
			.remove();

		var title = $("<div>")
			.addClass("dropdown-title-wrapper")
			.html($(this).html());

		return $(this)
			.html(title)
			.append(list);
	}

	$.fn.dropdownOnMouseEntersList = function(config) {
		return $(this)
			.dropdownOpenList(config)
			.siblings(".dropdown-open")
			.dropdownCloseList(config)
			.siblings(".dropdown-open");
	}

	$.fn.dropdownOnMouseLeavesList = function(config) {
		var list = this;
		var t = setTimeout(function() {
			$(list).dropdownCloseList(config);
		}, config.timeout);

		return $(this).on("mouseenter", function() {
			clearTimeout(t);
			$(this).off("mouseenter");
		});
	}

	$.fn.dropdownOpenList = function(config) {
		$(this)
			.off("mouseenter")
			.addClass("dropdown-open")
			.find(config.listSelector)
			.find(config.listItemSelector)
			.each(function() {
				$(this)
					.show()
					.on("click", function() {
						if($.isFunction(config.onItemClick)) config.onItemClick(this);
					});
			});

		return $(this);
	}

	$.fn.dropdownCloseList = function(config) {
		// var list = this;
		$(this)
			.on("mouseenter", function() {
				$(this).dropdownOnMouseEntersList(config);
			})
			.removeClass("dropdown-open")
			.find(config.listSelector)
			.find(config.listItemSelector)
			.each(function() {
				$(this)
					.hide()
					.off("click");
			});

		return $(this);
	}

	$.fn.dropdown = function(options) {
		var that = this;

		var config = $.extend({}, $.fn.dropdown.defaults, options);

		return this.each(function() {
			$(this).dropdownApplyDropdown(config);
		});
	};

	$.fn.dropdown.defaults = {
    		listSelector : "ul, ol",
    		listItemSelector : "*",
    		onItemClick : null,
    		timeout : 500
		};
})(jQuery);

"use strict";
(function($) {

	/**
	@author: Olmo Kramer
	@description: jQuery plugin to easily add dropdown effect to list-like items
	 */

	$.fn.dropdown = function(options) {
		var config = $.extend({}, $.fn.dropdown.defaults, options);

		return this.each(function() {
			$(this).dropdownApplyDropdown(config);
		});
	};

	$.fn.dropdownApplyDropdown = function(config) {
		return $(this)
			.dropdownAddClasses(config)
			.dropdownApplyWrappers(config)
			.dropdownAttachEvents(config);
	};

	$.fn.dropdownAddClasses = function(config) {
		$(this)
			.addClass("dropdown")
			.find(config.listSelector)
			.addClass("dropdown-list")
			.find(config.listItemSelector)
			.each(function() {
				$(this).addClass("dropdown-list-item");
			});

		return $(this);
	};

	$.fn.dropdownApplyWrappers = function(config) {
		// find list;
		var list = $("<div>")
			.addClass("dropdown-list-wrapper")
			.html($(this)
				.find(config.listSelector)
				.remove());

		var title = $("<div>")
			.addClass("dropdown-title-wrapper")
			.html($(this).html());

		return $(this)
			.html(title)
			.append(list);
	};

	$.fn.dropdownAttachEvents = function(config) {
		$(this)
			.on({
				mouseenter: function() {
					$(this).dropdownOnMouseEntersList(config);
				},
				mouseleave: function() {
					$(this).dropdownOnMouseLeavesList(config);
				}
			});
		if($.isFunction(config.onMouseEntersList)) {
			$(this).on("dropdown.enterList", function(e) {
				$.extend(e, {
					list: this,
					config: config
				});
				config.onMouseEntersList(e);
			});
		}
		if($.isFunction(config.onOpenList)) {
			$(this).on("dropdown.openList", function(e) {
				$.extend(e, {
					list: this,
					config: config
				});
				config.onOpenList(e);
			});
		}
		if($.isFunction(config.onMouseLeavesList)) {
			$(this).on("dropdown.leaveList", function(e) {
				$.extend(e, {
					list: this,
					config: config
				});
				config.onMouseLeavesList(e);
			});
		}
		if($.isFunction(config.onCloseList)) {
			$(this).on("dropdown.closeList", function(e) {
				$.extend(e, {
					list: this,
					config: config
				});
				config.onCloseList(e);
			});
		}
		if($.isFunction(config.onItemClick)) {
			$(this)
				.find(config.listSelector)
				.on("click", ".dropdown-list-item", function(e) {
					e.config = config;
					config.onItemClick(e);
				});
		}

		return $(this);
	};

	$.fn.dropdownOnMouseEntersList = function(config) {
		$(this)
			.dropdownOpenList(config)
			.trigger({
				type: "dropdown.enterList",
				message: "mouse entered list",
				time: new Date().getTime()
			})
			.siblings(".dropdown-open")
			.dropdownCloseList(config);

		return $(this);
	};

	$.fn.dropdownOnMouseLeavesList = function(config) {
		var list = this;
		var t = setTimeout(function() {
			$(list).dropdownCloseList(config);
		}, config.closeTimeout);

		return $(this)
			.on("mouseenter", function() {
				clearTimeout(t);
				$(this).off("mouseenter");
			})
			.trigger({
				type: "dropdown.leaveList",
				message: "mouse left list",
				time: new Date().getTime()
			});
	};

	$.fn.dropdownOpenList = function(config) {
		$(this)
			.off("mouseenter")
			.addClass("dropdown-open")
			.trigger({
				type: "dropdown.openList",
				message: "opening dropdown lists",
				time: new Date().getTime()
			});

		return $(this);
	};

	$.fn.dropdownCloseList = function(config) {
		// var list = this;
		$(this)
			.on("mouseenter", function() {
				$(this).dropdownOnMouseEntersList(config);
			})
			.removeClass("dropdown-open")
			.trigger({
				type: "dropdown.closeList",
				message: "closing dropdown lists",
				time: new Date().getTime()
			});

		return $(this);
	};

	$.fn.dropdown.defaults = {
		listSelector : "ul, ol",
		listItemSelector : "*",
		onItemClick : null,
		onOpenList : null,
		onCloseList : null,
		onMouseEntersList : null,
		onMouseLeavesList : null,
		closeTimeout : 500,
		dropdownTime : 500,
		jumpupTime : 500
	};

	$.fn.dropdown.defaults.onOpenList = function(e) {
		var list = e.list;
		var config = e.config;
		$(list)
			.find(config.listSelector)
			.find(config.listItemSelector)
			.each(function() {
				$(this).show();
			});
	};

	$.fn.dropdown.defaults.onCloseList = function(e) {
		var list = e.list;
		var config = e.config;
		$(list)
			.find(config.listSelector)
			.find(config.listItemSelector)
			.each(function() {
				$(this).hide();
			});
	};
})(jQuery);

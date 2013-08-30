(function($) {

	/**
	@author: Olmo Kramer
	@description: jQuery plugin to easily add dropdown effect to list-like items
	 */

	$.fn.dropdown = function(options) {
		var that = this;
		that.options = options;

        /*
        set that.config
        */

        function getDefaultSettings(selector) {
        	var config = {
        		listSelector : "ul",
        		listItemSelector : "*",
        		complete : complete,
        		timeout : 500
        	};

        	if(selector) return config[selector];
        	return config;
        }

        if (!options) {
            that.config = getDefaultSettings();
        } else {
            that.config = {
            	listSelector: options.listSelector || getDefaultSettings("listSelector"),
            	listItemSelector: options.listItemSelector || getDefaultSettings("listItemSelector"),
            	complete: options.complete || getDefaultSettings("complete"),
            	timeout: options.timeout || getDefaultSettings("timeout")
            }
        }

        if($(that).length === 1) {
        	applyDropdown($(that));
	    } else {
	    	$(that).each(function() {
	    		applyDropdown($(this));
	    	});
	    }

		that.config.complete();

		function applyDropdown(el) {
    		addClasses(el);
    		attachEvents(el);
    		applyWrappers(el);
		}

		function addClasses(el) {
			el
				.addClass("dropdown")
				.find(that.config.listSelector)
				.addClass("dropdown-list")
				.find(that.config.listItemSelector)
				.each(function() {
					$(this).addClass("dropdown-list-item")
				});
		}

		function attachEvents(el) {
			el.on({
				mouseenter: onMouseEnterList,
				mouseleave: onMouseLeaveList
			});
		}

		function applyWrappers(el) {
			// find list;
			var list = $("<div>")
				.addClass("dropdown-list-wrapper")
				.html(el.clone().find(that.config.listSelector));

			//find title
			el.find(that.config.listSelector).remove();
			var title = $("<div>")
				.addClass("dropdown-title-wrapper")
				.html(el.html());

			el.html(title).append(list);
		}

		function onMouseEnterList() {
			closeList($(this).siblings(".dropdown-open"));
			$(this)
				.off("mouseenter")
				.addClass("dropdown-open")
				.find(that.config.listSelector)
				.find(that.config.listItemSelector)
				.each(function() {
					$(this).show();
				});
		}

		function onMouseLeaveList() {
			var list = this,
				t = setTimeout(function() {
					closeList($(list));
				}, that.config.timeout);

			$(this).on("mouseenter", function() {
				clearTimeout(t);
				$(this).off("mouseenter");
			});
		}

		function closeList(el) {
			el
				.removeClass("dropdown-open")
				.find(that.config.listSelector)
				.find(that.config.listItemSelector)
				.each(function() {
					$(this).hide();
					$(el).on("mouseenter", onMouseEnterList);
				});
		}

		function complete() {
			console.log("dropdown completed");
		}


	}
})(jQuery);

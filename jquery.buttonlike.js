/*!
* ButtonLike 1.1 (a jQuery plugin, obviously)
* Copyright 2013, Heydon Pickering: http://www.heydonworks.com
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*/

(function($){
	$.fn.extend({
		buttonlike: function(options) {
			//Settings list and the default values
			var defaults = {
				pressed: null, 
				// If the button uses "aria-pressed" (exists in on/off states) then choose the appropriate initial state ('true' or 'false'). 
				controls: null 
				// A space separated string of ID selectors for elements the button affects, indicated with "aria-controls" attribute eg. Sidebar 
			};
			var candidate = $(this); // the potential button
			var actualbutton = candidate.is('button'); // true if candidate is a <button>
			var options = $.extend(defaults, options);
			return this.each(function() {
				var button;
				var wrappertags = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'li', 'dt', 'dd'];
				// if the candidate is one of these we should inject a span with the button role so the semantics aren't wrecked (eg. "Heading Level 1" is still announced in AT).
				var badtags = ['ul', 'ol', 'dl', 'menu', 'table', 'tr'];
				// 'grouping' elements that should not be used as buttons
				if ($.inArray(candidate.get(0).tagName.toLowerCase(), badtags) !== -1) {
					console.log('buttonlike.js: You shouldn\'t make a button out of that <'+candidate.get(0).tagName.toLowerCase()+'>');
				} else {
					if (actualbutton) {
						button = candidate; // the button is already a button
						button.prop('type', 'button'); // so make sure it has the correct type property (not "submit")
					} else {
						if ($.inArray(candidate.get(0).tagName.toLowerCase(), wrappertags) !== -1) {
							candidate.wrapInner('<span />');
							button = candidate.find('> span');
							// make the button a new span child element to preserve parent #a11y semantics and allow styling inheritance (which would be inconsistent with a true <button>)
						} else {
							button = candidate;
						}
						button.attr({
							'role' : 'button', // give it the correct role, so it is announced as a <button> to participating AT
							'tabindex': '0' // make it focusable. Pretty damn important if you're using a keyboard. 
						});
					}
					if (options.controls) {
						button.attr('aria-controls', options.controls); // what elements the button affects in the DOM
					}
					if (null !== options.pressed) {
						button.attr('aria-pressed', options.pressed); // set initial aria-pressed value for toggles
					}
					button.focus(function() {
						button.on('keydown.button', function(e) {
							if (e.keyCode == 13 || e.keyCode == 32) {
								if (actualbutton) {
									button.one(function() { // to suppress multiple click events on true <button>s
										button.trigger('click'); // trigger click event on ENTER and SPACE
									});
								} else {
									button.trigger('click');
								}
							}
						});
					});
					button.blur(function() {
						button.off('keydown.button');
					});
					button.on('click', function() {
						if (null !== options.pressed) {
							(button.attr('aria-pressed') == 'true') ? button.attr('aria-pressed', 'false') : button.attr('aria-pressed', 'true');
							// toggle between on/off "pressed" states for toggle buttons
						}
					});
				}
			});
		}
	});
})(jQuery);
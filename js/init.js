/*
	Escape Velocity by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {
		var settings = {
		
		// Header (homepage only)
			header: {
				fullScreen: true,
				fadeIn: true,
				fadeDelay: 50
			},

		// Carousels
			carousels: {
				speed: 10,
				fadeIn: true,
				fadeDelay: 50
			},
	};

	skel.init({
		reset: 'full',
		breakpoints: {
			'global':	{ range: '*', href: 'css/style.css' },
			'desktop':	{ range: '737-', href: 'css/style-desktop.css', containers: 1200, grid: { gutters: 50 } },
			'1000px':	{ range: '737-1200', href: 'css/style-1000px.css', containers: 1000, grid: { gutters: 35 }, viewport: { width: 1080 } },
			'mobile':	{ range: '-736', href: 'css/style-mobile.css', containers: '100%', grid: { collapse: true, gutters: 10 }, viewport: { scalable: false } }
		},
		plugins: {
			layers: {
				navPanel: {
					hidden: true,
					breakpoints: 'mobile',
					position: 'top-left',
					side: 'left',
					animation: 'pushX',
					width: '80%',
					height: '100%',
					clickToHide: true,
					html: '<div data-action="navList" data-args="nav"></div>',
					orientation: 'vertical'
				},
				titleBar: {
					breakpoints: 'mobile',
					position: 'top-left',
					side: 'top',
					height: 44,
					width: '100%',
					html: '<span class="toggle" data-action="toggleLayer" data-args="navPanel"></span><span class="title" data-action="copyHTML" data-args="logo"></span>'
				}
			}
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body');
			
		// Disable animations/transitions until the page has loaded.
			$body.addClass('is-loading');
			
			$window.on('load', function() {
				$body.removeClass('is-loading');
			});
			
		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {
				
				$form.find('.form-button-submit')
					.on('click', function() {
						$(this).parents('form').submit();
						return false;
					});
		
				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}

		// CSS polyfills (IE<9).
			if (skel.vars.IEVersion < 9)
				$(':last-child').addClass('last-child');

			
			// Scrolly links.
			$('.scrolly').scrolly();			

		// Carousels.
			$('.carousel').each(function() {
				
				var	$t = $(this),
					$forward = $('<span class="forward"></span>'),
					$backward = $('<span class="backward"></span>'),
					$reel = $t.children('.reel'),
					$items = $reel.children('article');
				
				var	pos = 0,
					leftLimit,
					rightLimit,
					itemWidth,
					reelWidth,
					timerId;

				// Items.
					if (settings.carousels.fadeIn) {
						
						$items.addClass('loading');

						$t.onVisible(function() {
							var	timerId,
								limit = $items.length - Math.ceil($window.width() / itemWidth);
							
							timerId = window.setInterval(function() {
								var x = $items.filter('.loading'), xf = x.first();
								
								if (x.length <= limit) {
									
									window.clearInterval(timerId);
									$items.removeClass('loading');
									return;
								
								}
								
								if (skel.vars.IEVersion < 10) {
									
									xf.fadeTo(750, 1.0);
									window.setTimeout(function() {
										xf.removeClass('loading');
									}, 50);
								
								}
								else
									xf.removeClass('loading');
								
							}, settings.carousels.fadeDelay);
						}, 50);
					}
				
				// Main.
					$t._update = function() {
						pos = 0;
						rightLimit = (-1 * reelWidth) + $window.width();
						leftLimit = 0;
						$t._updatePos();
					};
				
					if (skel.vars.IEVersion < 9)
						$t._updatePos = function() { $reel.css('left', pos); };
					else
						$t._updatePos = function() { $reel.css('transform', 'translate(' + pos + 'px, 0)'); };
					
				// Forward.
					$forward
						.appendTo($t)
						.hide()
						.mouseenter(function(e) {
							timerId = window.setInterval(function() {
								pos -= settings.carousels.speed;

								if (pos <= rightLimit)
								{
									window.clearInterval(timerId);
									pos = rightLimit;
								}
								
								$t._updatePos();
							}, 10);
						})
						.mouseleave(function(e) {
							window.clearInterval(timerId);
						});
				
				// Backward.
					$backward
						.appendTo($t)
						.hide()
						.mouseenter(function(e) {
							timerId = window.setInterval(function() {
								pos += settings.carousels.speed;

								if (pos >= leftLimit) {
									
									window.clearInterval(timerId);
									pos = leftLimit;
								
								}
								
								$t._updatePos();
							}, 10);
						})
						.mouseleave(function(e) {
							window.clearInterval(timerId);
						});
						
				// Init.
					$window.load(function() {

						reelWidth = $reel[0].scrollWidth;

						skel.change(function() {
				
							if (skel.vars.isTouch) {
								
								$reel
									.css('overflow-y', 'hidden')
									.css('overflow-x', 'scroll')
									.scrollLeft(0);
								$forward.hide();
								$backward.hide();
							
							}
							else {
								
								$reel
									.css('overflow', 'visible')
									.scrollLeft(0);
								$forward.show();
								$backward.show();
							
							}

							$t._update();
						});

						$window.resize(function() {
							reelWidth = $reel[0].scrollWidth;
							$t._update();
						}).trigger('resize');

					});
				
			});
		
			
		// Dropdowns.
			$('#nav > ul').dropotron({ 
				mode: 'fade',
				noOpenerFade: true,
				alignment: 'center',
				detach: false
			});
			
	});

})(jQuery);
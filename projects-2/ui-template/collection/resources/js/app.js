'use strict';

var APP = APP || {};

$(function() {
	var $main = $('main');
	var $mainImage = $('.js--main-image');
	var $nav_home = $('.js--nav-home');
	var $collection = $('.js--collection');
	var $details = $('.js--details');
	var $nav_events = $('.js--nav-events');
	var $events = $('.js--events');
	var $aboutUs = $('.js--nav-aboutus');

	/* ----------------------------------- */
	/* Window events */
	/* ----------------------------------- */

	$(window).scroll(function() {
		if ($(document).height() <= $(window).scrollTop() + $(window).height()) {
			// console.log("window.scroll");
			if ($collection.is(':visible')) {
				$main.trigger('init');
			}
		}
	});

	/* ----------------------------------- */
	/* Custom events */
	/* ----------------------------------- */

	$main.on('init', function() {
		// console.log("$main.on('init')");
		APP.model.collection.getDataFromApiForCollection(function() {
			// console.log(">>> initial callback");
			APP.views.collection.renderCollection(APP.model.collection.storage, $collection, true);
			// console.log("<<< initial callback");
		});
	});

	$main.on('item-details', function(event, id) {
		// console.log("$main.on('item-details')");
		APP.model.details.getDataFromApiForItem(id, function() {
			// console.log(">>> initial callback");
			APP.views.details.renderItem(APP.model.details.storage, $details);
			$mainImage.hide();
			$collection.hide();
			$details.show();
			// console.log("<<< initial callback");
		});
	});

	/* ----------------------------------- */
	/* Navigation events */
	/* ----------------------------------- */

	$mainImage.on('click', function() {
		var id = $(this).attr('data-item-id');
		// console.log('details for id: '+id);
		$main.trigger('item-details', id);
	});

	$nav_home.on('click', function() {
		// console.log('$nav_home');
		$mainImage.show();
		$details.hide();
		$collection.show();
		$events.hide();
	});

	$nav_events.on('click', function() {
		// console.log('$nav_events');
		if ($events.children().length < 1) {
			// console.log('empty events');
			APP.views.events.getRenderEvents($events, function() {
				$mainImage.show();
				$details.hide();
				$collection.hide();
				$events.show();
			});
		} else {
			// console.log('NOT empty events');
			$mainImage.show();
			$details.hide();
			$collection.hide();
			$events.show();
		}
	});

	$aboutUs.on('click', function() {
		// console.log("$aboutUs");
	});

	/* ----------------------------------- */
	/* Collection item details             */
	/* ----------------------------------- */

	$collection.on('click', '.js--select-item', function() {
		// console.log("click: .js--collection .js--select-item");
		var id = $(this).attr('data-item-id');
		// console.log("details for id: "+id);
		$main.trigger('item-details', id);
	});

	$details.on('click', 'img', function(event) {
		// console.log("click; .js--details img");
		event.preventDefault();
		var ahref = $(this).parent();
		ahref.fancybox({
			type: 'image', // as url is not obviously an image
			openEffect: 'none',
			closeEffect: 'none',
		});
		ahref.click();
	});

	/* ----------------------------------- */
	/* Entry point                         */
	/* ----------------------------------- */

	$main.trigger('init');
});

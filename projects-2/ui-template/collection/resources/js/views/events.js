'use strict';

/*jshint multistr: true */

var APP = APP || {};
APP.views = APP.views || {};

APP.views.events = {
	getNoEventsTemplate: function() {
		return '\
<div data-item-id={{1}}>\
    <h2>Events</h2>\
    <p class="tour-description">There are currently no events planned. Please check back soon.</p>\
</div>';
	},
	getTemplate: function() {
		return '\
<div data-item-id={{1}}>\
    <h2>{{2}}</h2>\
    <p class="tour-description">{{3}}<a href="{{4}}" target="_blank">More Details</a></p>\
    <p class="tour-time">Tour time: {{7}}<a href="{{6}}" target="_blank">Reservations and Ticketing</a></p>\
</div>';
	},
	buildEvent: function(idx, item) {
		var template = this.getTemplate();
		return template
			.replace('{{1}}', idx)
			.replace('{{2}}', item.pageRef.title)
			.replace('{{3}}', item.exposition.description)
			.replace('{{4}}', item.pageRef.url)
			.replace('{{6}}', item.links.web)
			.replace('{{7}}', item.period.text);
	},
	renderEvents: function(data, element) {
		// console.log('>>> renderEvents');
		var html = '';
		var that = this;
		if (data.options && data.options.length > 0) {
			data.options.forEach(function(item, idx) {
				html += that.buildEvent(idx, item);
			});
		} else {
			html += that.getNoEventsTemplate();
		}
		element.html(html);
		// console.log('<<< renderEvents');
	},
	getEvents: function() {
		var query = APP.keys.EVENTS_URL + '/' + APP.utils.formatDate(new Date()) + APP.keys.query;
		return $.getJSON(query);
	},
	getRenderEvents: function(element, callback) {
		// console.log('>>> getRenderEvents');
		var that = this;
		this.getEvents().done(function(results) {
			that.renderEvents(results, element);
			if (callback) {
				callback();
			}
		});
		// console.log('<<< getRenderEvents');
	},
};

'use strict';

var APP = APP || {};

APP.utils = {
	handleUrlArray: function(title, array) {
		if (array && array.length > 0) {
			var html = '<div>' + title + '<ul>';
			array.forEach(function(item) {
				html += '<li><a href="' + item.url + '">' + item.name + '</a></li>';
			});
			html += '</ul></div>';
			return html;
		}
		return '';
	},
	handleArray: function(title, array) {
		if (array && array.length > 0) {
			var html = '<div>' + title + '<ul>';
			array.forEach(function(item) {
				html += '<li><a href="">' + item + '</a></li>';
			});
			html += '</ul></div>';
			return html;
		}
		return '';
	},
	formatDate: function(date) {
		var d = new Date(date);
		var month = '' + (date.getMonth() + 1);
		var day = '' + d.getDate();
		var year = d.getFullYear();
		if (month.length < 2) {
			month = '0' + month;
		}
		if (day.length < 2) {
			day = '0' + day;
		}
		return [year, month, day].join('-');
	},
};

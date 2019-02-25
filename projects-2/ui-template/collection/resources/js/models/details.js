'use strict';

var APP = APP || {};
APP.model = APP.model || {};

APP.model.details = {
	storage: [],

	getOptions: function() {
		var options = {};
		options.key = APP.keys.API_KEY;
		options.format = 'json';
		return options;
	},
	getDataFromApi: function(search_url, options, callback) {
		// console.log('>>> APP.model.details.getDataFromApi; options' + JSON.stringify(options));
		var that = this;
		var request = $.ajax({
			url: search_url,
			data: options,
			dataType: 'json',
			type: 'GET',
		});
		request.done(function(data) {
			// console.log('addData');
			that.storage = data;
			if (callback) {
				callback();
			}
		});
		request.fail(function(jqXHR, status) {
			// console.log('ajax get failed; ' + status);
		});
		// console.log('<<< APP.model.details.getDataFromApi');
	},

	getDataFromApiForItem: function(id, callback) {
		// console.log('>>> APP.model.details.getDataFromApiForItem; id ' + id);
		var options = this.getOptions();
		this.getDataFromApi(APP.keys.COLLECTION_URL + '/' + id, options, callback);
		// console.log('<<< APP.model.details.getDataFromApiForItem');
	},
};

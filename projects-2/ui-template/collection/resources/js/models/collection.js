'use strict';

var APP = APP || {};

APP.model = APP.model || {};

APP.model.collection = {
	page: 1,
	storage: [],

	getOptions: function() {
		var options = {};
		options.key = APP.keys.API_KEY;
		options.format = 'json';
		options.p = this.page;
		options.ps = 20;
		options.imgonly = true;
		//        options.s = "relevance";
		return options;
	},
	getDataFromApi: function(search_url, options, callback) {
		// console.log('>>> APP.model.collection.getDataFromApi; options' + JSON.stringify(options));
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
			that.page++;
			callback();
		});
		request.fail(function(jqXHR, status) {
			// console.log('ajax get failed; ' + status);
		});
		// console.log('<<< APP.model.collection.getDataFromApi');
	},

	getDataFromApiForCollection: function(callback) {
		// console.log('>>> APP.model.collection.getDataFromApiForCollection');
		var options = this.getOptions();
		this.getDataFromApi(APP.keys.COLLECTION_URL, options, callback);
		// console.log('<<< APP.model.collection.getDataFromApiForCollection');
	},
};

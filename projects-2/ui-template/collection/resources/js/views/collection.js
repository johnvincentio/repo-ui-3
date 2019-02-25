'use strict';

/*jshint multistr: true */

var APP = APP || {};
APP.views = APP.views || {};

APP.views.collection = {
	getTemplate: function() {
		return '\
    <div class="outer-box col-xs-12 col-sm-6 col-md-4 col-lg-3">\
        <figure class="js--select-item" data-item-id="{{1}}">\
            <div><img src="{{5}}" alt="{{6}}"></div>\
            <figcaption>\
                <h2 class="text-center">{{2}}</h2>\
                <p class="text-center">{{3}}</p>\
            </figcaption>\
        </figure>\
    </div>';
	},

	buildItem: function(idx, item) {
		var template = this.getTemplate();
		return template
			.replace('{{1}}', item.objectNumber)
			.replace('{{2}}', item.title)
			.replace('{{3}}', item.principalOrFirstMaker)
			.replace('{{4}}', item.objectNumber)
			.replace('{{5}}', item.webImage.url)
			.replace('{{6}}', item.title);
	},

	renderCollection: function(data, element, scrolling) {
		console.log('>>> APP.views.collection.renderCollection');
		var html = '';
		var that = this;
		if (data.artObjects && data.artObjects.length > 0) {
			data.artObjects.forEach(function(item, idx) {
				html += that.buildItem(idx, item);
			});
		}
		if (scrolling) {
			element.append(html);
		} else {
			element.html(html);
		}
		console.log('<<< APP.views.collection.renderCollection');
	},
};

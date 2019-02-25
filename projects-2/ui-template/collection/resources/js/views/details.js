'use strict';

/*jshint multistr: true */

var APP = APP || {};
APP.views = APP.views || {};

APP.views.details = {
	getArtistHtml: function(maker) {
		var html = '<div class="artist text-left">';
		html += '<p class="artist-name">' + maker.name + '</p>';
		if (maker.nationality !== null) {
			html += '<p>Nationality: ' + maker.nationality + '</p>';
		}

		if (maker.dateOfBirth !== null && maker.placeOfBirth !== null) {
			html += '<p>Born: ' + maker.placeOfBirth + ', ' + maker.dateOfBirth + '</p>';
		} else if (maker.dateOfBirth !== null) {
			html += '<p>Born: ' + maker.dateOfBirth + '</p>';
		} else if (maker.placeOfBirth !== null) {
			html += '<p>Born: ' + maker.placeOfBirth + '</p>';
		}

		if (maker.dateOfDeath !== null && maker.placeOfDeath !== null) {
			html += '<p>Died: ' + maker.placeOfDeath + ', ' + maker.dateOfDeath + '</p>';
		} else if (maker.dateOfDeath !== null) {
			html += '<p>Died: ' + maker.dateOfDeath + '</p>';
		} else if (maker.placeOfDeath !== null) {
			html += '<p>Died: ' + maker.placeOfDeath + '</p>';
		}
		html += '</div>';
		return html;
	},

	getWideTemplate: function() {
		return '\
<div class="outer-box" data-item-id="{{1}}">\
    <div class="col-xs-12">\
        <a class="fancybox fancybox.image" href="{{30}}" title="{{31}}">\
            <img class="img-responsive" src="{{2}}" alt="{{3}}">\
        </a>\
    </div>\
    <div class="art-header col-xs-12">\
        <h2 class="text-center">{{4}}</h2>\
        <p class="text-left">{{10}}</p>\
    </div>\
    <div class="art-details col-xs-12 text-left">\
        <p>Dimensions: {{5}}</p>\
        <p>Materials: {{9}}</p>\
        {{40}}\
    </div>\
</div>\
    ';
	},

	getTallTemplate: function() {
		return '\
<div class="outer-box" data-item-id="{{1}}">\
    <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">\
        <a class="fancybox fancybox.image" href="{{30}}" title="{{31}}">\
            <img class="img-responsive" src="{{2}}" alt="{{3}}">\
        </a>\
    </div>\
    <div class="art-header col-xs-12 col-sm-6 col-md-6 col-lg-6 text-left">\
        <h2 class="text-left">{{4}}</h2>\
        <p>{{10}}</p>\
    </div>\
    <div class="art-details col-xs-12 col-sm-6 col-md-6 col-lg-6 text-left">\
        <p>Dimensions: {{5}}</p>\
        <p>Materials: {{9}}</p>\
        {{40}}\
    </div>\
</div>\
    ';
	},

	buildCollectionItem: function(item, page) {
		var template = null;
		var image_width = item.webImage.width;
		var image_height = item.webImage.height;
		if (image_width > image_height + 250) {
			template = this.getWideTemplate();
		} else if (image_height > image_width + 250) {
			template = this.getTallTemplate();
		} else {
			template = this.getTallTemplate();
		}
		var label = item.label.description;
		if (label === undefined || label === null) {
			label = page.plaqueDescription;
		}

		var artistHtml = '';
		if (item.principalMakers && item.principalMakers.length > 0) {
			var maker = item.principalMakers[0];
			artistHtml = this.getArtistHtml(maker);
		}

		return template
			.replace('{{1}}', item.objectNumber)
			.replace('{{2}}', item.webImage.url)
			.replace('{{3}}', item.title)
			.replace('{{4}}', item.longTitle)
			.replace('{{5}}', item.subTitle)
			.replace('{{9}}', item.physicalMedium)
			.replace('{{10}}', label)
			.replace('{{30}}', item.webImage.url)
			.replace('{{31}}', item.longTitle)
			.replace('{{40}}', artistHtml);
	},
	renderItem: function(data, element) {
		// console.log('>>> APP.views.details.renderItem');
		var html = this.buildCollectionItem(data.artObject, data.artObjectPage);
		element.html(html);
		// console.log('<<< APP.views.details.renderItem');
	},
};

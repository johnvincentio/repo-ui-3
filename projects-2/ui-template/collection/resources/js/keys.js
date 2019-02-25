'use strict';

var APP = APP || {};

APP.keys = {
	RIJKSMUSEUM_URL: 'https://www.rijksmuseum.nl/api/en',
	API_KEY: '3yLwaBE9',
};

APP.keys.COLLECTION_URL = APP.keys.RIJKSMUSEUM_URL + '/collection';
APP.keys.EVENTS_URL = APP.keys.RIJKSMUSEUM_URL + '/agenda';
APP.keys.query = '?key=' + APP.keys.API_KEY + '&format=json';

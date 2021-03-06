/*global Backbone */
var app = app || {};

(function () {
	'use strict';
	app.User = Backbone.Model.extend({
		defaults: {
			title: '',
			completed: false
		},
		toggle: function () {
			this.save({
				completed: !this.get('completed')
			});
		}
	});
})();
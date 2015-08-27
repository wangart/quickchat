var app = angular.module('kwikchat' ,['ngRoute']);

app.config(function($routeProvider) {
	 $routeProvider
    .when('/chat', {
	    controller: 'ChatController', 
	    templateUrl: 'views/chat.html'
	})
	.when('/about', {
	    controller: 'AboutController', 
	    templateUrl: 'views/about.html'
	})
	.otherwise({
	redirectTo: '/chat'
	}); 
});
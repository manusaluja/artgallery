
var artApp = angular.module('art', ['ui.router','angular-loading-bar', 'ngAnimate', 'starter.controllers','cfp.loadingBar']);

artApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/friend-detail.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
         url: '/about',
            templateUrl: 'templates/about.html',
            controller: 'AccountCtrl'
        });
        
});





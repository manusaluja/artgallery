
var artApp = angular.module('art', ['ui.router','angular-loading-bar', 'ngAnimate', 'starter.controllers','cfp.loadingBar', 'LocalStorageModule','ui.bootstrap']);

artApp.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider) {
    
    localStorageServiceProvider.setPrefix('artonline');

  // localStorageServiceProvider.setStorageCookieDomain('example.com');
  // localStorageServiceProvider.setStorageType('sessionStorage');
    $urlRouterProvider.otherwise('/home');
    
    $stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html'
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('about', {
            // we'll get to this in a bit
            url: '/about',
            templateUrl: 'templates/about.html',
            controller: 'AccountCtrl'
        })
        .state('account',{
            url:'/account',
            templateUrl:'templates/account.html',
            controller: 'AccountCtrl'
        })
        .state('collections',{
            url:'/collections',
            templateUrl:'templates/collections.html'
        });
        
}).directive('stopClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
});





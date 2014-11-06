
var artApp = angular.module('art', ['ui.router','angular-loading-bar', 'ngAnimate', 'starter.controllers','cfp.loadingBar', 'LocalStorageModule','ui.bootstrap']);

artApp.config(function($stateProvider, $urlRouterProvider, localStorageServiceProvider, $httpProvider) {
    
    localStorageServiceProvider.setPrefix('artonline');
    $httpProvider.responseInterceptors.push(["$q", "$timeout", function ($q, $timeout) {
    return function (promise) {
        var defer = $q.defer();

        $timeout(function () {
            promise.then(function (data) {
                defer.resolve(data);
            });
        }, 2500);

        return defer.promise;
    };
}]);
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
            templateUrl:'templates/account.html'
        })
        .state('collections',{
            url:'/collections',
            templateUrl:'templates/collections.html'
        });
        
});





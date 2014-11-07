
var artApp = angular.module('art', ['ui.router','angular-loading-bar', 'ngAnimate', 'starter.controllers','cfp.loadingBar', 'LocalStorageModule','ui.bootstrap','akoenig.deckgrid']);

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
        .state('dashboard',{
            url:'/dashboard',
            templateUrl:'templates/dashboard.html',
            controller: 'DashCtrl'
        })
        .state('collections',{
            url:'/collections',
            templateUrl:'templates/collections.html'
        })
        

}).directive('stopClick', function() {
    return function(scope, element, attrs) {
        $(element).click(function(event) {
            event.preventDefault();
        });
    }
}).directive('imageloaded', [

    function () {

        'use strict';

        return {
            restrict: 'A',

            link: function(scope, element, attrs) {   
                var cssClass = attrs.loadedclass;

                element.bind('load', function (e) {
                    angular.element(element).addClass(cssClass);
                });
            }
        }
    }
]);





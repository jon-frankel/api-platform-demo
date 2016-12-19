/* global angular */
/* global _ */
"use strict";

(function () {
    angular
        .module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'restangular'])
        .constant('_', _)
        .config(['$httpProvider', HttpConfig])
        .config(['$routeProvider', RouteConfig])
        .run(['$rootScope', 'ReviewFactory', Initialize])
    ;

    function HttpConfig($httpProvider) {
        $httpProvider.defaults.headers.common.Accept = 'application/json';
    }

    function RouteConfig($routeProvider) {
        var templatePrefix = '/bundles/app/views/';

        $routeProvider
            .when('/book', {
                templateUrl: templatePrefix + 'book.html',
                controller: 'BookController',
                controllerAs: 'bookCtrl'
            })
            .when('/review', {
                templateUrl: templatePrefix + 'review.html',
                controller: 'ReviewController',
                controllerAs: 'reviewCtrl'
            })
            .otherwise({
                redirectTo: '/review'
            })
        ;
    }

    function Initialize($rootScope, ReviewFactory) {
        ReviewFactory
            .get()
            .then(function (reviews) {
                $rootScope.reviews = reviews;
            })
        ;
    }
})();

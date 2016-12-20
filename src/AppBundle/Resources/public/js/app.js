/* global angular */
/* global _ */
"use strict";

(function () {
    angular
        .module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'restangular'])
        .constant('_', _)
        .config(['$httpProvider', HttpConfig])
        .config(['$routeProvider', RouteConfig])
        // .run(['ReviewFactory', 'BookFactory', Initialize])
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
                controllerAs: 'bookCtrl',
                resolve: {
                    books: ['BookFactory', function (BookFactory) {
                        return BookFactory.get();
                    }]
                }
            })
            .when('/review', {
                templateUrl: templatePrefix + 'review.html',
                controller: 'ReviewController',
                controllerAs: 'reviewCtrl',
                resolve: {
                    reviews: ['ReviewFactory', function (ReviewFactory) {
                        return ReviewFactory.get();
                    }]
                }
            })
            .otherwise({
                redirectTo: '/review'
            })
        ;
    }

    function Initialize(ReviewFactory, BookFactory) {
        ReviewFactory.get();
        BookFactory.get();
    }
})();

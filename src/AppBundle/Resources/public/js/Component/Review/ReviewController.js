/* global angular */
'use strict';

(function () {

    angular
        .module('app')
        .controller(
            'ReviewController',
            ['$scope', 'ReviewFactory', ReviewController]
        )
    ;

    function ReviewController($scope, ReviewFactory) {
        var vm = this;

        vm.reviews = [];

        ReviewFactory
            .get()
            .then(function (reviews) {
                vm.reviews = reviews;
            })
        ;
    }
})();

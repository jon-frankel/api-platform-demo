/* global angular */
'use strict';

(function () {

    angular
        .module('app')
        .controller(
            'ReviewController',
            ['$scope', ReviewController]
        )
    ;

    function ReviewController($scope) {
        var vm = this;
    }
})();

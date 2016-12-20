/* global angular */
'use strict';

(function () {

    angular
        .module('app')
        .controller(
            'BookController',
            ['$scope', BookController]
        )
    ;

    function BookController($scope) {
        var vm = this;
    }
})();

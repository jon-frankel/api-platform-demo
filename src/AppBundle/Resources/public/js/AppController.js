/* global angular */
'use strict';

(function () {

    angular
        .module('app')
        .controller(
            'AppController',
            ['$scope', AppController]
        )
    ;

    function AppController($scope) {
        var vm = this;
    }
})();

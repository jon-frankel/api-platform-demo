/* global angular */
'use strict';

(function () {

    angular
        .module('app')
        .controller(
            'AppController',
            ['$rootScope', '$location', AppController]
        )
    ;

    function AppController($rootScope, $location) {
        var vm = this;
        $rootScope.location = $location;
    }
})();

/* global angular */
'use strict';

(function () {

    angular
        .module('app')
        .controller(
            'AppController',
            ['$rootScope', AppController]
        )
    ;

    function AppController($rootScope) {
        var vm = this;
        $rootScope.rootHello = 'hello from the $rootScope';
    }
})();

/* global angular */
'use strict';

(function () {

    angular
        .module('app')
        .controller(
            'ReviewController',
            ['$scope', '$rootScope', 'ReviewFactory', ReviewController]
        )
    ;

    function ReviewController($scope, $rootScope, ReviewFactory) {
        var vm = this;

        vm.hello = 'hello from the vm';
        $scope.hello = 'hello from the $scope';
    }
})();

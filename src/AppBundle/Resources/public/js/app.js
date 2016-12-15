/* global angular */
/* global _ */
"use strict";

(function () {
    angular
        .module('app', ['ngRoute', 'ngAnimate', 'ngSanitize', 'ui.bootstrap', 'restangular'])
        .value('_', _)
        .config(['$httpProvider', HttpConfig])
    ;
})();

function HttpConfig($httpProvider) {
    $httpProvider.defaults.headers.common.Accept = 'application/json';
}

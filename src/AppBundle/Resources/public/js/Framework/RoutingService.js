/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .service('RoutingService', RoutingService)
    ;

    function RoutingService() {
        this.path = function (modelName, modelId) {
            var uri = '/api/' + _.pluralize(modelName.toLowerCase());
            uri += typeof modelId !== 'undefined' ? '/' + modelId.id() : '';
            return uri;
        };
    }
})();

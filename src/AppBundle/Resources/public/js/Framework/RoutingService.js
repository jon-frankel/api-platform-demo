/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .service('RoutingService', RoutingService)
    ;

    function RoutingService() {
            // coerce the modelId to an int, in case it's an Endpoint object
        function coerceId(modelId) {
            if (modelId.hasOwnProperty('id') && typeof modelId['id'] === 'function') {
                modelId = modelId.id();
            }
            return modelId
        }

        this.path = function (modelName, modelId) {
            var uri = '/api/' + _.pluralize(modelName.toLowerCase());
            uri += typeof modelId !== 'undefined' ? '/' + coerceId(modelId) : '';
            return uri;
        };
    }
})();

/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .service('RoutingService', RoutingService)
    ;

    function RoutingService() {
        this.coerceNumericId = function (id) {
            if (typeof id === 'number') {
                return id;
            }

            return Number(id.split('/').pop());
        };

        this.path = function (modelName, modelId) {
            var uri = '/api/' + _.pluralize(modelName.toLowerCase());
            uri += typeof modelId !== 'undefined' ? '/' + this.coerceNumericId(modelId) : '';
            return uri;
        };
    }
})();

/* global angular */
/* global _ */
"use strict";

(function () {
    angular
        .module('app')
        .service('EndpointService', ['_', 'EndpointFactory', EndpointService])
    ;

    function EndpointService(_, EndpointFactory)
    {
        function getNewEndpoint(uri) {
            if (typeof uri === 'string' && EndpointFactory.matchUri(uri) !== null) {
                return new EndpointFactory(uri);
            } else if (Array.isArray(uri)) {
                return _.each(uri, getNewEndpoint);
            }
            return uri;
        }

        this.loadEndpoints = function (properties) {
            return _.each(properties, getNewEndpoint);
        };
    }
})();

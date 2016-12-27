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
        function getNewEndpoint(value) {
            if (typeof value === 'string' && EndpointFactory.matchUri(value) !== null) {
                value = new EndpointFactory(value);
            } else if (Array.isArray(value)) {
                value = _.map(value, getNewEndpoint);
            }
            return value;
        }

        this.loadEndpoints = function (instance) {
            return _.mapObject(instance, getNewEndpoint);
        };
    }
})();

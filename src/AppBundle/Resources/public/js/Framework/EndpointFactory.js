/* global angular */
/* global _ */
"use strict";

(function () {
    angular
        .module('app')
        .factory('EndpointFactory', ['$injector', '$q', '_', EndpointFactory])
    ;

    function EndpointFactory($injector, $q, _)
    {
        function matchUri(uri) {
            var pattern = /^\/api\/([\w\-\_]+)\/(\d+)$/g;
            return pattern.exec(uri);
        }

        /**
         * Endpoint object, created from a URI, which must take the following form:
         * `/api/{entityType}/{id}`
         *
         * @param uri
         * @constructor
         */
        function Endpoint(uri) {
            this.uri = uri;

            this.id = function () {
                var matches = matchUri(this.uri);
                return matches[2];
            };

            /**
             * @returns promise
             */
            this.get = function () {
                var matches = matchUri(this.uri);

                if (matches === null) {
                    var deferred = $q.defer();
                    deferred.reject({'error': this.uri + ' does not describe an API endpoint'});
                    return deferred.promise;
                }

                var modelName = matches[1];
                var factoryName = _.chain(modelName).singularize().classify().value() + 'Factory';
                var factory = $injector.get(factoryName);
                return factory.get(matches[2]);
            };
        }

        Endpoint.prototype.valueOf = function () {
            return this.uri;
        };

        Endpoint.matchUri = matchUri;

        return Endpoint;
    }
})();

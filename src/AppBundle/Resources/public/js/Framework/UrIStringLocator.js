/* global angular */
/* global _ */
"use strict";

(function () {
    angular
        .module('app')
        .run(['$injector', '$q', '_', BindToString])
    ;

    function BindToString($injector, $q, _) {
        String.prototype.get = function () {
            var pattern = /^\/api\/([\w\-\_]+)\/\d+$/g;
            var matches = pattern.exec(this);

            if (matches === null) {
                var deferred = $q.defer();
                deferred.reject({'error': this + ' does not describe an API endpoint'});
                return deferred.promise;
            }

            var modelName = matches[1];
            var factoryName = _.chain(modelName).singularize().classify().value() + 'Factory';
            var factory = $injector.get(factoryName);
            return factory.get(this);
        };

        String.prototype.id = function () {
            var pattern = /^\/api\/[\w\-\_]+\/(\d+)$/g;
            var matches = pattern.exec(this);
            return matches === null ? this : matches[1];
        };

        Number.prototype.id = function () {
            return this;
        };
    }
})();

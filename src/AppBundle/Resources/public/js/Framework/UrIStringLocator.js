/* global angular */
/* global _ */
"use strict";

(function () {
    angular
        .module('app')
        .run(['$injector', '_', BindToString])
    ;

    function BindToString($injector, _) {
        String.prototype.get = function () {
            var modelName = this.split('/')[2];
            var factoryName = _.chain(modelName).singularize().titleize().value();
            var factory = $injector.get(factoryName + 'Factory');
            return factory.get(this);
        };

        String.prototype.id = function () {
            return this.split('/').pop();
        };
    }
})();

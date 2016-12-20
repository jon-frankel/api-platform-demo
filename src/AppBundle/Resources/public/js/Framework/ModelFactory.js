/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('ModelFactory', ['$rootScope', '$http', '$q', 'RoutingService', '_', ModelFactory])
    ;

    function ModelFactory($rootScope, $http, $q, RoutingService, _) {
        function Model() {
            var self = this;

            this.modelName = '';
            this.id = null;

            this.path = function (id) {
                return RoutingService.path(this.modelName, id);
            };

            this.reload = function () {
                var deferred = $q.defer();

                $http
                    .get(self.path(self.id))
                    .then(function (response) {
                        _.extend(self, response.data);
                        deferred.resolve(self);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.post = function () {
                var deferred = $q.defer();

                $http
                    .post(self.path(), self)
                    .then(function (response) {
                        _.extend(self, response.data);
                        deferred.resolve(self);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.put = function () {
                var deferred = $q.defer();

                $http
                    .put(self.path(self.id), self)
                    .then(function (response) {
                        _.extend(self, response.data);
                        deferred.resolve(self);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.delete = function () {
                var deferred = $q.defer();

                $http
                    .delete(self.path(self.id))
                    .then(function (response) {
                        delete $rootScope[self.modelName][self.id];
                        return deferred.resolve(response);
                    }, function (error) {
                        return deferred.reject(error);
                    })
                ;

                return deferred;
            };
        }

        return Model;
    }
})();

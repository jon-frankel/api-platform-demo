/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('ModelFactory', [
            '$rootScope', '$http', '$q', 'RoutingService', '_', 'EndpointService', ModelFactory
        ])
    ;

    function ModelFactory($rootScope, $http, $q, RoutingService, _, EndpointService) {
        function Model() {
            var self = this;

            this.allowedMethods = ['getItem', 'getCollection', 'put', 'post', 'delete'];
            this.modelName = '';
            this.id = null;

            this.path = function (id) {
                return RoutingService.path(this.modelName, id);
            };

            this.reload = function () {
                var deferred = $q.defer();

                if (self.allowedMethods.indexOf('getItem') === -1) {
                    deferred.reject({'error': 'Method GET not allowed on ' + self.modelName + ' items.'});
                    return deferred.promise;
                }

                $http
                    .get(self.path(self.id))
                    .then(function (response) {
                        _.extend(self, EndpointService.loadEndpoints(response.data));
                        deferred.resolve(self);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.post = function () {
                var deferred = $q.defer();

                if (self.allowedMethods.indexOf('post') === -1) {
                    deferred.reject({'error': 'Method GET not allowed on ' + self.modelName + ' items.'});
                    return deferred.promise;
                }
                
                $http
                    .post(self.path(), self)
                    .then(function (response) {
                        _.extend(self, EndpointService.loadEndpoints(response.data));
                        deferred.resolve(self);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.put = function () {
                var deferred = $q.defer();

                if (self.allowedMethods.indexOf('put') === -1) {
                    deferred.reject({'error': 'Method GET not allowed on ' + self.modelName + ' items.'});
                    return deferred.promise;
                }
                
                $http
                    .put(self.path(self.id), self)
                    .then(function (response) {
                        _.extend(self, EndpointService.loadEndpoints(response.data));
                        deferred.resolve(self);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.delete = function () {
                var deferred = $q.defer();

                if (self.allowedMethods.indexOf('delete') === -1) {
                    deferred.reject({'error': 'Method GET not allowed on ' + self.modelName + ' items.'});
                    return deferred.promise;
                }

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

        Model.allowedMethods = ['getItem', 'getCollection', 'put', 'post', 'delete'];

        // For some reason instances inherit the name property of the prototype object
        Object.defineProperty(Model, 'name', {writable: true});

        return Model;
    }
})();

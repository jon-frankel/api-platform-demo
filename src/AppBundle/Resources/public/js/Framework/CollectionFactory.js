/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('CollectionFactory', [
            '$rootScope', '$http', '$q', 'RoutingService', '_', 'EndpointService', CollectionFactory
        ])
    ;

    function CollectionFactory($rootScope, $http, $q, RoutingService, _, EndpointService) {
        function Collection (model) {
            var self = this;

            this.model = model;
            this.collectionName = _.pluralize(this.model.modelName.toLowerCase());

            if (typeof $rootScope[this.collectionName] === 'undefined') {
                $rootScope[this.collectionName] = {};
            }

            this.path = function (id) {
                return RoutingService.path(self.model.modelName, id);
            };


            this.new = function (params) {
                var instance = new self.model();

                if (typeof params !== 'undefined') {
                    _.extend(instance, EndpointService.loadEndpoints(params));
                }

                return instance;
            };

            this.get = function (id, forceReload) {
                return typeof id === 'undefined' ? self.getCollection() : self.getItem(id, forceReload);
            };

            this.getItem = function (id, forceReload) {
                var deferred = $q.defer();

                if (self.model.allowedMethods.indexOf('getItem') === -1) {
                    deferred.reject({'error': 'Method GET not allowed on ' + self.model.modelName + ' items.'});
                }

                // check if the entity is cached in the root scope
                else if (
                    !forceReload &&
                    typeof $rootScope[self.collectionName][id.id()] !== 'undefined'
                ) {
                    deferred.resolve($rootScope[self.collectionName][id.id()]);
                }

                // otherwise get the single item
                else {
                    $http
                        .get(self.path(id))
                        .then(function (response) {
                            var instance = self.new(response.data);
                            $rootScope[self.collectionName][instance.id] = instance;
                            deferred.resolve(instance);
                        }, function (error) {
                            deferred.reject(error);
                        })
                    ;
                }

                return deferred.promise;
            };

            this.getCollection = function () {
                var deferred = $q.defer();

                if (self.model.allowedMethods.indexOf('getCollection') === -1) {
                    deferred.reject({'error': 'Method GET not allowed on ' + self.model.modelName + ' items.'});
                    return deferred.promise;
                }

                $http
                    .get(self.path())
                    .then(function (response) {
                        for (var r = 0; r < response.data.length; r++) {
                            var instance = self.new(response.data[r]);
                            $rootScope[self.collectionName][instance.id] = instance;
                        }
                        deferred.resolve($rootScope[self.collectionName]);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred.promise;
            };
        }

        return Collection;
    }
})();

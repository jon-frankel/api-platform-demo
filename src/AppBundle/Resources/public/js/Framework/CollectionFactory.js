/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('CollectionFactory', ['$rootScope', '$http', '$q', 'RoutingService', '_', CollectionFactory])
    ;

    function CollectionFactory($rootScope, $http, $q, RoutingService, _) {
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
                    _.extend(instance, params);
                }

                return instance;
            };

            this.get = function (id) {
                var deferred = $q.defer();

                if (typeof id === 'undefined') {
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
                } else {
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
        }

        return Collection;
    }
})();

/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('ModelFactory', ['$http', '$q', '_', ModelFactory])
        .factory('ReviewFactory', ['$http', '$q', '_', ReviewFactory])
    ;

    function ModelFactory($http, $q, _) {
        var Factory = function (model, basePath) {
            this.model = model;
            this.basePath = basePath;
        };

        Factory.prototype.new = function (params) {
            var instance = new this.model();

            if (typeof params !== 'undefined') {
                _.extend(instance, params);
            }

            return instance;
        };

        Factory.prototype.get = function (id) {
            var deferred = $q.defer();

            if (typeof id === 'undefined') {
                $http
                    .get(this.basePath)
                    .then(function (response) {
                        var instances = [];
                        for (var r = 0; r < response.data.length; r++) {
                            instances.push(this.new(response.data[r]));
                        }
                        deferred.resolve(instances);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;
            } else {
                $http
                    .get(id)
                    .then(function (response) {
                        deferred.resolve(this.new(response.data));
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;
            }

            return deferred;
        };

        return Factory;
    }

    function ReviewFactory($http, $q, _, ModelFactory) {
        var Model = function () {
            this.rating = null;
            this.body = null;
            this.author = null;
            this.publicationDate = null;
            this.book = null;
        };

        Model.prototype.reload = function () {
            var deferred = $q.defer();

            $http
                .get(this.id)
                .then(function (response) {
                    _.extend(this, response.data);
                    deferred.resolve(this);
                }, function (error) {
                    deferred.reject(error);
                })
            ;

            return deferred;
        };

        Model.prototype.post = function () {
            var deferred = $q.defer();

            $http
                .post(this.id, this)
                .then(function (response) {
                    _.extend(this, response.data);
                    deferred.resolve(this);
                }, function (error) {
                    deferred.reject(error);
                })
            ;

            return deferred;
        };

        Model.prototype.put = function () {
            var deferred = $q.defer();

            $http
                .put(this.id, this)
                .then(function (response) {
                    _.extend(this, response.data);
                    deferred.resolve(this);
                }, function (error) {
                    deferred.reject(error);
                })
            ;

            return deferred;
        };

        Model.prototype.delete = function () {
            var deferred = $q.defer();

            $http
                .delete(this.id)
                .then(function (response) {
                    return deferred.resolve(response);
                }, function (error) {
                    return deferred.reject(error);
                })
            ;

            return deferred;
        };

        return new ModelFactory(Model, 'review');
    }
})();

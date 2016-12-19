/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('ModelFactory', ['$http', '$q', '_', ModelFactory])
        .factory('ReviewFactory', ['$http', '$q', '_', 'ModelFactory', ReviewFactory])
    ;

    function ModelFactory($http, $q, _) {
        function Factory (model, basePath) {
            var that = this;
            that.model = model;
            that.basePath = basePath;

            this.new = function (params) {
                var instance = new that.model();

                if (typeof params !== 'undefined') {
                    _.extend(instance, params);
                }

                return instance;
            };

            this.get = function (id) {
                var deferred = $q.defer();

                if (typeof id === 'undefined') {
                    $http
                        .get(that.basePath)
                        .then(function (response) {
                            var instances = [];
                            for (var r = 0; r < response.data.length; r++) {
                                instances.push(that.new(response.data[r]));
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
                            deferred.resolve(that.new(response.data));
                        }, function (error) {
                            deferred.reject(error);
                        })
                    ;
                }

                return deferred.promise;
            };
        }

        return Factory;
    }

    function ReviewFactory($http, $q, _, ModelFactory) {
        var basePath = '/api/reviews';
        function Model() {
            this.rating = null;
            this.body = null;
            this.author = null;
            this.publicationDate = null;
            this.book = null;

            this.reload = function () {
                var deferred = $q.defer();

                $http
                    .get(basePath + '/' + this.id)
                    .then(function (response) {
                        _.extend(this, response.data);
                        deferred.resolve(this);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.post = function () {
                var deferred = $q.defer();

                $http
                    .post(basePath + '/' + this.id, this)
                    .then(function (response) {
                        _.extend(this, response.data);
                        deferred.resolve(this);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.put = function () {
                var deferred = $q.defer();

                $http
                    .put(basePath + '/' + this.id, this)
                    .then(function (response) {
                        _.extend(this, response.data);
                        deferred.resolve(this);
                    }, function (error) {
                        deferred.reject(error);
                    })
                ;

                return deferred;
            };

            this.delete = function () {
                var deferred = $q.defer();

                $http
                    .delete(basePath + '/' + this.id)
                    .then(function (response) {
                        return deferred.resolve(response);
                    }, function (error) {
                        return deferred.reject(error);
                    })
                ;

                return deferred;
            };
        }

        return new ModelFactory(Model, basePath);
    }
})();

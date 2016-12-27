/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('ReviewFactory', ['CollectionFactory', 'ModelFactory', 'ReviewProperties', '_', ReviewFactory])
        .constant('ReviewProperties', {
            itemReviewed: null,
            rating: null,
            reviewBody: null
        })
    ;

    function ReviewFactory(CollectionFactory, ModelFactory, ReviewProperties, _) {
        var ReviewModel = function () {
            ModelFactory.call(this);
            _.extend(this, ReviewProperties);
            this.modelName = 'Review';
        };

        ReviewModel.modelName = 'Review';
        ReviewModel.allowedMethods = ['getItem', 'getCollection', 'put', 'post', 'delete'];
        ReviewModel.prototype = Object.create(ModelFactory);
        ReviewModel.constructor = ReviewModel;

        return new CollectionFactory(ReviewModel);
    }

})();

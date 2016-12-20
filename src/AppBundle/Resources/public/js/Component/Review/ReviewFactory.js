/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('ReviewFactory', ['CollectionFactory', 'ModelFactory', 'ReviewProperties', '_', ReviewFactory])
        .constant('ReviewProperties', {
            rating: null,
            body: null,
            author: null,
            publicationDate: null,
            book: null
        })
    ;

    function ReviewFactory(CollectionFactory, ModelFactory, ReviewProperties, _) {
        var ReviewModel = function () {
            ModelFactory.call(this);
            _.extend(this, ReviewProperties);
            this.modelName = 'Review';
        };

        ReviewModel.modelName = 'Review';
        ReviewModel.prototype = Object.create(ModelFactory);
        ReviewModel.constructor = ReviewModel;

        return new CollectionFactory(ReviewModel);
    }

})();

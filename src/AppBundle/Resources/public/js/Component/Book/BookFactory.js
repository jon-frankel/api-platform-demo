/* global angular */
"use strict";

(function () {
    angular
        .module('app')
        .factory('BookFactory', ['CollectionFactory', 'ModelFactory', 'BookProperties', '_', BookFactory])
        .constant('BookProperties', {
            isbn: null,
            name: null,
            description: null,
            author: null,
            dateCreated: null,
            reviews: null
        })
    ;

    function BookFactory(CollectionFactory, ModelFactory, BookProperties, _) {
        var BookModel = function () {
            ModelFactory.call(this);
            _.extend(this, BookProperties);
            this.modelName = 'Book';
        };

        BookModel.modelName = 'Book';
        BookModel.allowedMethods = ['getItem', 'getCollection', 'put', 'post', 'delete'];
        BookModel.prototype = Object.create(ModelFactory);
        BookModel.constructor = BookModel;

        return new CollectionFactory(BookModel);
    }

})();

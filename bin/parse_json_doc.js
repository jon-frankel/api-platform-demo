/* jslint esversion: 6 */
"use strict";

var request = require("request-promise");
var beautify = require('js-beautify');
var _ = require("underscore");
_.mixin(require("underscore.inflections"));

var json;

request
    .get("http://api-platform-demo.dev/doc.json")
    .then((response) => {
        json = JSON.parse(response);
        parseJsonDoc(json);
    })
;

function parseJsonDoc(json) {
    let classes = _.allKeys(json.definitions);
    let properties = _.allKeys(json.definitions[classes[0]].properties);
    let factory = getFactoryString(classes[0], properties);
    factory = beautify.js_beautify(factory);
    console.log(factory);
}

function getFactoryString(name, fields) {
    return `
    function ${_.classify(name)}Factory($http) {
        ${getPrivateAttributes(fields)}
        
        var service = {};
        ${getPublicMethods(fields)}
        
        return service;
    }
`
            // ${getFactoryMethods(fields)}
    ;
}

function getPrivateAttributes (fields) {
    var attributes = '';

    for (let f = 0; f < fields.length; f++) {
        attributes += `
            _${fields[f]} = null;`;
    }

    return attributes;
}

function getPublicMethods (fields) {
    var attributes = '';

    for (let f = 0; f < fields.length; f++) {
        attributes += `
        
            service.${fields[f]} = function(field) {
                return typeof field === 'undefined' ? service.${fields[f]} : service.${fields[f]} = field; 
            };`;
    }

    return attributes;
}

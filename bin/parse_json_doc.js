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
        
        let service = {};
        ${getPublicMethods(fields)}
        
        return service;
    }`;
}

function getPrivateAttributes (fields) {
    let attributes = '';

    for (let f = 0; f < fields.length; f++) {
        attributes += `
            let _${fields[f]} = null;`;
    }

    return attributes;
}

function getPublicMethods (fields) {
    let attributes = '';

    for (let f = 0; f < fields.length; f++) {
        attributes += f > 0 ? '\n' : '';
        attributes += `
            service.${fields[f]} = function(field) {
                return typeof field === 'undefined' ? _${fields[f]} : _${fields[f]} = field; 
            };`;
    }

    return attributes;
}

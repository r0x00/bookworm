const express = require('express');
const _ = require('lodash');
const Dictionary = require('../api/services/Dictionary');
const router = express.Router();

const routes = {};

routes.general = {
    "get /dictionary": {
        services: Dictionary,
        method: "translation"
    },
};

_.each(routes, (v, k) => {
    _.each(v, (values, name) => { 
        const [method, path] = name.split(' ');

        router[method](path, values.services[values.method]);
    });
});

module.exports = router;



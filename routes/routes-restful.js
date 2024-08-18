const express = require('express');
const _ = require('lodash');
const router = express.Router();

const routes = {};

routes.general = {
    "get /dictionary": {
        services: "Dictionary",
        method: "translation"
    }
};


_.each(routes, (v, k) => {
    _.each(v, (values, name) => { 
        const [method, path] = name.split(' ');
        
        router[method](path, (req, res, next) => {

        });
    });
});



module.exports = router;



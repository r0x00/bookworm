const express = require('express');
const _ = require('lodash');
const DictionaryServices = require('../api/services/DictionaryServices');
const BookServices = require('../api/services/BookServices');
const ChapterService = require('../api/services/ChapterService');

const router = express.Router();

const routes = {};

routes.dictionary = {
    "get /dictionary": {
        services: DictionaryServices,
        method: "translation"
    },
};

routes.book = {
    "get /book": {
        services: BookServices,
        method: "load"
    },

    "get /book/:id": {
        services: BookServices,
        method: "show"
    },

    "post /book": {
        services: BookServices,
        method: "create"
    },

    "patch /book": {
        services: BookServices,
        method: "update"
    },

    "delete /book": {
        services: BookServices,
        method: "delete"
    },
};

routes.chapter = {
    "get /chapter/book/:book": {
        services: ChapterService,
        method: "load"
    },

    "get /chapter/:id": {
        services: ChapterService,
        method: "show"
    },

    "post /chapter": {
        services: ChapterService,
        method: "create"
    },

    "patch /chapter": {
        services: ChapterService,
        method: "update"
    },

    "delete /chapter": {
        services: ChapterService,
        method: "delete"
    },
};

_.each(routes, (v, k) => {
    _.each(v, (values, name) => { 
        const [method, path] = name.split(' ');

        router[method](path, values.services[values.method]);
    });
});

module.exports = router;



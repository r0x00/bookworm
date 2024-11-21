const express = require('express');
const _ = require('lodash');
const DictionaryServices = require('../api/services/DictionaryServices');
const BookServices = require('../api/services/BookServices');
const ChapterServices = require('../api/services/ChapterServices');
const AuthServices = require('../api/services/AuthServices');
const UserServices = require('../api/services/UserServices');

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
        services: ChapterServices,
        method: "load"
    },

    "get /chapter/:id": {
        services: ChapterServices,
        method: "show"
    },

    "post /chapter": {
        services: ChapterServices,
        method: "create"
    },

    "patch /chapter": {
        services: ChapterServices,
        method: "update"
    },

    "delete /chapter": {
        services: ChapterServices,
        method: "delete"
    },
};

routes.auth = {
    "post /auth/login": {
        services: AuthServices,
        method: "login"
    },

    "post /auth/logout": {
        services: AuthServices,
        method: "logout"
    },
};

routes.user = {
    "get /user": {
        services: UserServices,
        method: "load"
    },

    "get /user/:id": {
        services: UserServices,
        method: "show"
    },

    "post /user": {
        services: UserServices,
        method: "create"
    },

    "patch /user": {
        services: UserServices,
        method: "update"
    },

    "delete /user": {
        services: UserServices,
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



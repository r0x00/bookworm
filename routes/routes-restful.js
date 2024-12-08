const express = require('express');
const _ = require('lodash');
const DictionaryServices = require('../api/services/DictionaryServices');
const BookServices = require('../api/services/BookServices');
const ChapterServices = require('../api/services/ChapterServices');
const AuthServices = require('../api/services/AuthServices');
const UserServices = require('../api/services/UserServices');
const EnviromentServices = require('../api/services/EnviromentServices');
const policy = require('../api/policy');
const ShowcaseService = require('../api/services/ShowcaseService');

const router = express.Router();

const routes = {};

routes.enviroment = {
    "get /enviroment/version": {
        services: EnviromentServices,
        method: "version"
    },
};


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
        method: "create",
        policy: [ "auth" ]
    },

    "patch /book": {
        services: BookServices,
        method: "update",
        policy:[ "auth" ]
    },

    "delete /book": {
        services: BookServices,
        method: "delete",
        policy:[ "auth" ]
    },
};


routes.showcase = {
    "get /showcase": {
        services: ShowcaseService,
        method: "load",
    },

    "get /showcase/:id": {
        services: ShowcaseService,
        method: "show",
    },

    "post /showcase": {
        services: ShowcaseService,
        method: "create",
        policy: [ "auth", "admin"]
    },

    "patch /showcase": {
        services: ShowcaseService,
        method: "update",
        policy:[ "auth", "admin"]
    },

    "delete /showcase": {
        services: ShowcaseService,
        method: "delete",
        policy:[ "auth", "admin"]
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
        method: "create",
        policy: [ "auth" ]
    },

    "patch /chapter": {
        services: ChapterServices,
        method: "update",
        policy: [ "auth" ]
    },

    "delete /chapter": {
        services: ChapterServices,
        method: "delete",
        policy: [ "auth" ]
    },
};

routes.auth = {
    "post /auth/login": {
        services: AuthServices,
        method: "login"
    },

    "post /auth/logout": {
        services: AuthServices,
        method: "logout",
        policy: [ "auth" ]
    },
};

routes.user = {
    "get /user": {
        services: UserServices,
        method: "load",
        policy: [ "auth", "admin" ]
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
        method: "update",
        policy: [ "auth" ]
    },

    "delete /user": {
        services: UserServices,
        method: "delete",
        policy: [ "auth", "admin" ]
    },
};

_.each(routes, (v, k) => {
    _.each(v, (values, name) => { 
        const [method, path] = name.split(' ');

        if(values.policy) {
            router[method](path, policy[values.policy[0]](), values.services[values.method]);

        } else {
            router[method](path, values.services[values.method]);
        };
    });
});

module.exports = router;
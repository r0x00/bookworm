#!/bin/bash

docker-compose -f docker-registry/docker-compose.yml up -d &&

nodemon ./bin/www

#!/bin/bash

docker-compose -f docker-registry/docker-compose.yml up -d

function checkDBContainer {

    while ! docker exec db mysqladmin --user="bookworm" --password="#pmDP#Wi@7JtXEhn@GT#_7mrOG#ItFk_#o" --host "127.0.0.1" ping --silent &> /dev/null ; do
        echo "Waiting for database connection..."

        sleep 2
    done
}

checkDBContainer

nodemon ./bin/www
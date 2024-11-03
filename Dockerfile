FROM node:22-alpine

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN yarn install

CMD ["node", "./bin/www"]
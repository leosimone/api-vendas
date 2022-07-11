FROM node:14.19.1-alpine3.14

RUN apk add --no-cache bash

USER node

WORKDIR /home/node/app

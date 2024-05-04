# syntax=docker/dockerfile:1

FROM node:22-alpine3.18

RUN npm install -g @angular/cli

WORKDIR /app/client

COPY . /app/client/

RUN npm install --legacy-peer-deps

CMD ng serve --proxy-config src/proxy.conf.json --host=0.0.0.0
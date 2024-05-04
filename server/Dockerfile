# syntax=docker/dockerfile:1

FROM node:22-alpine3.18

FROM php:8.3.7RC1-zts-alpine

FROM composer:latest

WORKDIR /app/server

COPY . /app/server/

RUN composer install

CMD php -S 0.0.0.0:8000 -t public/ -c php.ini
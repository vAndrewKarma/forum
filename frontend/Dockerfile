FROM node:21-alpine3.18 AS development

WORKDIR /frontend

COPY ./package*.json ./

RUN npm install

COPY ./ .

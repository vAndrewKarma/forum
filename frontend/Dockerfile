FROM node:18 AS development

WORKDIR /frontend

COPY ./package*.json ./

RUN npm install

COPY ./ .



CMD ["npm","run", "dev"]

FROM node:18 AS development

WORKDIR /frontend

COPY ./package*.json ./

RUN npm install

COPY ./ .


RUN npm run build
CMD ["npm","run", "dev"]

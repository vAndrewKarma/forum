FROM node:18.19.0-alpine AS development
ENV MEMORY=4G

WORKDIR /frontend

COPY ./package*.json ./

RUN npm install

COPY ./ .

CMD ["npm","run", "dev"]

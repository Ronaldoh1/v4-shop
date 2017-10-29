FROM node:8-alpine

MAINTAINER SelfieStyler

ENV APP_NAME v4-shop
ENV APP_PORT 3001

ADD . /app
WORKDIR /app
RUN npm install

EXPOSE ${APP_PORT}

CMD npm start

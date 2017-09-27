FROM node:7.4

MAINTAINER SelfieStyler

ENV APP_NAME ss-admin
ENV APP_PORT 3001

ADD . /app
WORKDIR /app
RUN npm install

EXPOSE ${APP_PORT}

CMD npm start

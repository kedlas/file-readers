FROM php:7.1.1-alpine

RUN apk add --update nodejs

COPY . /usr/src/myapp

WORKDIR /usr/src/myapp

CMD [ "sh", "run.sh" ]

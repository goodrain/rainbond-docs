FROM node:16.14-alpine3.15 AS builder

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache git

WORKDIR /app
COPY package.json /app
COPY yarn.lock /app

RUN yarn config set registry https://registry.npmmirror.com \
    && yarn install

COPY . /app
RUN yarn docusaurus build

FROM nginx:1.21.6-alpine

COPY --from=builder /app/build /app/
COPY nginx.conf /etc/nginx/nginx.conf



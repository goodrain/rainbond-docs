FROM node:16.14-alpine3.15 AS builder

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache git

COPY package.json /rainbond-docs
COPY yarn.lock /rainbond-docs
WORKDIR /rainbond-docs

RUN yarn config set registry https://registry.npmmirror.com \
    && yarn install

COPY . /rainbond-docs
RUN yarn docusaurus build

FROM nginx:1.21.6-alpine

COPY --from=builder /rainbond-docs/build /app/
COPY nginx.conf /etc/nginx/nginx.conf



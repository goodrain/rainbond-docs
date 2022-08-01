FROM node:16.14-alpine3.15 AS builder

WORKDIR /opt

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache git \
    && git clone https://ghproxy.com/https://github.com/goodrain/rainbond-docs

RUN yarn config set registry https://registry.npmmirror.com \
    && yarn install \
    && yarn docusaurus build

FROM nginx:1.21.6-alpine

COPY --from=builder /opt/build /app/
COPY nginx.conf /etc/nginx/nginx.conf



FROM node:16.14-alpine3.15 AS builder

WORKDIR /opt
COPY . .

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories \
    && apk add --no-cache git \
    && yarn config set registry https://registry.npm.taobao.org \
    && yarn install \
    && yarn run build --out-dir build/docs

FROM nginx:1.21.6-alpine

COPY --from=builder /opt/build /app/
COPY nginx.conf /etc/nginx/nginx.conf



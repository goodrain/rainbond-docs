FROM node:16.14-alpine3.15 AS builder

# sed -i 's/dl-cdn.alpinelinux.org/mirrors.aliyun.com/g' /etc/apk/repositories
RUN apk add --no-cache git

WORKDIR /app
COPY . /app
# yarn config set registry https://registry.npmmirror.com
RUN yarn install && yarn build

FROM nginx:1.21.6-alpine

COPY --from=builder /app/build /app/
COPY nginx.conf /etc/nginx/nginx.conf



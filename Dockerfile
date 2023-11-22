FROM node:16.14 as builder

WORKDIR /app
COPY . /app

RUN yarn install && \
    yarn build

FROM nginx:1.21.6-alpine

COPY --from=builder /app/build/ /app/
COPY nginx.conf /etc/nginx/conf.d/default.conf
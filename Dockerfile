FROM registry.cn-hangzhou.aliyuncs.com/goodrain/hugo:0.54.0

# copy doc
ADD . /app
WORKDIR /app
ARG BASEURL="https://v5.2-doc.rainbond.com${LOCATION}"
RUN hugo --baseURL=${BASEURL}

FROM nginx:1.15.9-alpine as runtime
ARG LOCATION="/"
COPY --from=builder /app/public /usr/share/nginx/html${LOCATION}
COPY nginx.conf /etc/nginx/nginx.conf




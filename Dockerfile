FROM alpine:3.9 as builder

# install hugo
RUN apk add --no-cache bash net-tools && \
    wget https://github.com/gohugoio/hugo/releases/download/v0.54.0/hugo_0.54.0_Linux-64bit.tar.gz && \
    tar -zxvf hugo_0.54.0_Linux-64bit.tar.gz -C /usr/local/bin/ && \
    rm -rf hugo_0.54.0_Linux-64bit.tar.gz

# copy doc
ADD . /app
WORKDIR /app
ARG LOCATION="/docs/"
ARG BASEURL="https://www.rainbond.com${LOCATION}"
RUN hugo --baseURL=${BASEURL}

FROM nginx:1.15.9-alpine as runtime
ARG LOCATION="/docs/"
COPY --from=builder /app/public /usr/share/nginx/html${LOCATION}
COPY nginx.conf /etc/nginx/nginx.conf




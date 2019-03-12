FROM alpine:3.8

# install hugo
RUN apk add --no-cache bash net-tools && \
    wget https://github.com/gohugoio/hugo/releases/download/v0.54.0/hugo_0.54.0_Linux-64bit.tar.gz && \
    tar -zxvf hugo_0.54.0_Linux-64bit.tar.gz -C /usr/local/bin/ && \
    rm -rf hugo_0.54.0_Linux-64bit.tar.gz

# copy doc
ADD . /app
WORKDIR /app
EXPOSE 1313

CMD ["hugo","server","--bind","0.0.0.0","--disableLiveReload","true","--baseURL","https://v5-1.docs.rainbond.com:443/docs/v5.1/"]



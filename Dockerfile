FROM goodrainapps/jekyll:3.6.2

MAINTAINER zhouyq@goodrain.com


RUN apk add --no-cache nginx \
    && mkdir /run/nginx

COPY . /srv/jekyll
COPY etc /etc

WORKDIR /srv/jekyll

EXPOSE 80
ENTRYPOINT ["/srv/jekyll/run.sh"]

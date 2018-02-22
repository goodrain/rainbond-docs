FROM goodrainapps/jekyll:3.6.2

MAINTAINER zhouyq@goodrain.com


# set timezone and install nginx
ENV TZ=Asia/Shanghai
RUN apk add --no-cache tzdata nginx \
    && mkdir /run/nginx \
    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
    && echo "Asia/Shanghai" >  /etc/timezone
ENV TZ=Asia/Shanghai


COPY . /srv/jekyll
COPY etc /etc

WORKDIR /srv/jekyll

# 安装组件
RUN bundle config mirror.https://rubygems.org https://gems.goodrain.me \
    && bundle

EXPOSE 80
ENTRYPOINT ["/srv/jekyll/run.sh"]

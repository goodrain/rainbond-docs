FROM goodrainapps/jekyll:3.6.2

MAINTAINER zhouyq@goodrain.com


RUN apk add --no-cache nginx \
    && mkdir /run/nginx

COPY . /srv/jekyll
COPY etc /etc

WORKDIR /srv/jekyll

# 安装组件
RUN bundle

# timezone
ENV TZ=Asia/Shanghai
RUN apk add --no-cache tzdata && \
       cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
       echo "Asia/Shanghai" >  /etc/timezone
ENV TZ=Asia/Shanghai

EXPOSE 80
ENTRYPOINT ["/srv/jekyll/run.sh"]

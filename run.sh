#!/bin/bash

[ $DEBUG ] && set -x 

sleep ${PAUSE:-0}

HOME_DOMAIN=${HOME_DOMAIN:-https://www.rainbond.com}
PORT=${PORT:-80}

# run crond
crond

# start nginx
if [ "$START_NGINX" == "true" ];then

  # replace nginx port
  sed -i "s/__PORT__/$PORT/g" /etc/nginx/conf.d/default.conf

  # build static
  bundle exec jekyll build
  nginx -t
  nginx -g 'daemon off;'
else

  # replace domain
  sed -i "s/__HOME__//" _config.yml
  bundle exec jekyll server -H 0.0.0.0 -P 4000
fi

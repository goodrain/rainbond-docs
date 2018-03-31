#!/bin/bash

[ $DEBUG ] && set -x 

sleep ${PAUSE:-0}

HOME_DOMAIN=${HOME_DOMAIN:-https://www.rainbond.com}

# run crond
crond

# start nginx
if [ "$START_NGINX" == "true" ];then

  # replace domain
  sed -i "s/__HOME/$HOME_DOMAIN/" _config.yml
  # build static
  bundle exec jekyll build
  nginx -t
  nginx -g 'daemon off;'
else

  # replace domain
  sed -i "s/__HOME//" _config.yml
  bundle exec jekyll server -H 0.0.0.0 -P 4000
fi

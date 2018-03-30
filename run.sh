#!/bin/bash

[ $DEBUG ] && set -x 
START_NGINX=${START_NGINX:-true}

sleep ${PAUSE:-0}

# run crond
crond

# build static
bundle exec jekyll build

# start nginx
if [ "$START_NGINX" == "true" ];then
  nginx -t
  nginx -g 'daemon off;'
else
  bundle exec jekyll server
fi

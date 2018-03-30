#!/bin/bash

[ $DEBUG ] && set -x 

sleep ${PAUSE:-0}

# run crond
crond

# start nginx
if [ "$START_NGINX" == "true" ];then
  # build static
  bundle exec jekyll build
  nginx -t
  nginx -g 'daemon off;'
else
  bundle exec jekyll server
fi

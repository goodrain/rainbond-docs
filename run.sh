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
  bundle exec jekyll server -H 0.0.0.0 -P 4000
fi

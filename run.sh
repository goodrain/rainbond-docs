#!/bin/bash

[ $DEBUG ] && set -x 


sleep ${PAUSE:-0}

# run crond
crond

# build static
bundle exec jekyll build

if [ "$START_NGINX" = "true" ];then
# start nginx
nginx -t
nginx -g 'daemon off;'
fi

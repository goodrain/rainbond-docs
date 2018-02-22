#!/bin/bash

[ $DEBUG ] && set -x 


sleep ${PAUSE:-0}

# run crond
crond

bundle exec jekyll build -I

# start nginx
nginx -t
nginx -g 'daemon off;'

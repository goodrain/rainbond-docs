#!/bin/bash

[ $DEBUG ] && set -x 


sleep ${PAUSE:-0}

bundle exec jekyll build

# start nginx
nginx -t
nginx -g 'daemon off;'

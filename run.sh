#!/bin/bash

[ $DEBUG ] && set -x 


sleep ${PAUSE:-0}

# run crond
crond

# build static
bundle exec jekyll build

# start nginx
nginx -t
nginx -g 'daemon off;'

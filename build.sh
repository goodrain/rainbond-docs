#!/bin/bash

# unset http.proxy
git config --unset http.proxy

isUpdate=$(git pull) 

if [ "$isUpdate" != "Already up-to-date." ]|| [ "$START_NGINX" != "true" ] ;then

  bundle exec jekyll build

fi

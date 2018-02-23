#!/bin/bash

# unset http.proxy
git config --unset http.proxy

git pull && bundle exec jekyll build

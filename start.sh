#!/bin/bash
BASEURL=${BASE_URL:-"https://www.rainbond.com/docs/"}
exec hugo server --bind="0.0.0.0" --disableLiveReload=true --baseURL=${BASEURL} --appendPort=false
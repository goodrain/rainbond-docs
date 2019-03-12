#!/bin/bash
BASEURL=${BASE_URL:-"https://v5-1.docs.rainbond.com/docs/v5.1/"}
exec hugo server --bind="0.0.0.0" --disableLiveReload=true --baseURL=${BASEURL} --appendPort=false
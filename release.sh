#!/bin/sh

IMAGE_DOMAIN=${IMAGE_DOMAIN:-'docker.io'}
IMAGE_NAMESPACE=${IMAGE_NAMESPACE:-'rainbond'}
DOMESTIC_DOMAIN=${DOMESTIC_DOMAIN:-'registry.cn-hangzhou.aliyuncs.com'}
DOMESTIC_NAMESPACE=${DOMESTIC_NAMESPACE:-'goodrain'}
VERSION=${VERSION:-'latest'}
AUTO_BUILD=${AUTO_BUILD:-'true'}

# git clone rainbond docs all commits
git clone -b main https://github.com/goodrain/rainbond-docs.git && cd rainbond-docs || exit

docker run --rm -v /node_modules:/app/node_modules -v "$PWD":/app -w /app node:16.14 sh -c "yarn install && yarn build"

docker build -t "$IMAGE_DOMAIN"/"$IMAGE_NAMESPACE"/rainbond-docs:"${VERSION}" .

if [ "$DOCKER_USERNAME" ]; then
  docker login -u "$DOCKER_USERNAME" -p "$DOCKER_PASSWORD"
  docker push "$IMAGE_DOMAIN"/"$IMAGE_NAMESPACE"/rainbond-docs:"${VERSION}"
fi

if [ "$DOMESTIC_USERNAME" ]; then
  docker login -u "$DOMESTIC_USERNAME" -p "$DOMESTIC_PASSWORD" "$DOMESTIC_DOMAIN"
  docker tag "$IMAGE_DOMAIN"/"$IMAGE_NAMESPACE"/rainbond-docs:"${VERSION}" "$DOMESTIC_DOMAIN"/"$DOMESTIC_NAMESPACE"/rainbond-docs:"${VERSION}"
  docker push "$DOMESTIC_DOMAIN"/"$DOMESTIC_NAMESPACE"/rainbond-docs:"${VERSION}"
fi

if [ "$AUTO_BUILD" = 'true' ]; then
  curl -d "{\"secret_key\":\"$RAINBOND_SECRET\"}" -H "Content-type: application/json" -X POST "$RAINBOND_API"
fi
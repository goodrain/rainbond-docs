VERSION=5.1
build:
	docker build -t rainbond/rbd-docs:${VERSION} .
debug:
	hugo server -D	
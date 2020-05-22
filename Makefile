VERSION=5.2
build:
	docker build -t rainbond/rbd-docs:${VERSION} .
debug:
	hugo server -D	
search-index:
	@hugo
	@algolia-client  recoder update --recodersFile public/algolia.json
	rm -rf public/*
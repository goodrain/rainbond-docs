FROM nginx:1.21.6-alpine

COPY build/ /app/
COPY nginx.conf /etc/nginx/nginx.conf
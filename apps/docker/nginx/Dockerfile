FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

# Generate a self-signed SSL certificate and key
RUN apk add --no-cache openssl \
    && mkdir -p /etc/nginx/certs \
    && openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
       -keyout /etc/nginx/certs/nginx.key \
       -out /etc/nginx/certs/nginx.crt \
       -subj "/C=US/ST=Denial/L=Springfield/O=Dis/CN=www.example.com"

COPY ./apps/docker/nginx/nginx.conf /etc/nginx/conf.d/nginx.conf

CMD [ "nginx-debug", "-g", "daemon off;" ]
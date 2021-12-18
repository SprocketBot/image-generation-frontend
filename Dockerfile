FROM node:14-alpine AS app_image

WORKDIR /temp
COPY . /temp
RUN cp src/config.template.json src/config.json \
&& npm i \
&& npm run build \
&& mkdir /app \
&& cp -R build/* /app \
&& cp /temp/package.json /app/package.json \
&& mv /temp/node_modules /app/node_modules

WORKDIR /app

COPY ca-certificate.cer /app/ca-sertificate.cer
COPY ca-certificate.cer /app/src/ca-sertificate.cer

COPY static /app/static

ENTRYPOINT ["node", "/app/index.js"]
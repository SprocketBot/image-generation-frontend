FROM node:16-alpine AS app_image

WORKDIR /temp
COPY . /temp
RUN npm i \
&& npm run build \
&& mkdir /app \
&& cp -R build/* /app \
&& cp /temp/package.json /app/package.json \
&& mv /temp/node_modules /app/node_modules

WORKDIR /app

COPY ca-certificate.cer /app/ca-sertificate.cer
COPY static /app/static

ENTRYPOINT ["node", "/app/index.js"]
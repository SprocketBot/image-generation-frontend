FROM node:14-alpine

WORKDIR /temp
COPY . /temp
RUN npm i && npm run build && mkdir /app && cp -R build/* /app && cp /temp/package.json /app/package.json && mv /temp/node_modules /app/node_modules
WORKDIR /app

ENTRYPOINT ["node", "/app/index.js"]
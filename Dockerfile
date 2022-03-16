FROM node:16-alpine as build
RUN apk add curl
WORKDIR /opt/app
ADD ./ ./
RUN npm install
ADD . ./
RUN npm run build
# todo: add one more image for compilled code by wep-pack or by something else
CMD ["node", "./dist/index.js"]
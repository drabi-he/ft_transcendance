FROM node:18.12.1-alpine

WORKDIR /app

COPY package*.json ./

RUN npm i react-scripts

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
FROM node:18.12.1-alpine

WORKDIR /app

RUN npm i -g @nestjs/cli

COPY package*.json ./

RUN npm install --include=dev

EXPOSE 3001

CMD [ "npm", "run", "start:dev" ]
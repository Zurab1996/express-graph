FROM node:latest

WORKDIR /app/backend

COPY package.json ./

RUN npm install

COPY . .

CMD [ "node", "index.js" ]

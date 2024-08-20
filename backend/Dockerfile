FROM node:alpine

WORKDIR /app

COPY ./backend/package* .

RUN npm install

COPY ./backend/ .

EXPOSE 3000


CMD [ "node", "index.js" ]

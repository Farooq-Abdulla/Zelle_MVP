FROM node:alpine

WORKDIR /app

COPY ./frontend/package* .

RUN npm install

COPY ./frontend .

EXPOSE 5173

CMD [ "npm", "run", "dev", "--", "--host", "0.0.0.0"]

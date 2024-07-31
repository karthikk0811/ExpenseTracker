FROM node:20

WORKDIR /app

COPY package* .

RUN npm install

COPY . .

EXPOSE 9000

CMD ["node","server.js"]

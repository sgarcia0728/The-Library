FROM node:16

RUN mkdir -p /node/app

WORKDIR /node/app

COPY . .

RUN npm install

RUN npm install pm2 -g

EXPOSE 3000

CMD ["pm2-runtime", "./src/index.js"]
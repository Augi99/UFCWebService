FROM node:14-alpine

RUN mkdir -p /home/api
WORKDIR /home/api
COPY . .

RUN npm install
RUN npm i express
RUN npm i joi@13.1.0
RUN npm i mongoose

EXPOSE 5500

CMD ["node", "src/index.js"]
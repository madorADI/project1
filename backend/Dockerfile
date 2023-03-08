FROM node:16.16.0-alpine3.15

WORKDIR .

ENV DB_NAME=smartAlert
ENV HOST_IP=127.0.0.1
ENV SERVER_IP=127.0.0.1
ENV SERVER_PORT=9000

COPY . .

RUN npm i

ENTRYPOINT ["npm", "run", "start", "./backend"]

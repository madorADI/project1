FROM node:16.16.0-alpine3.15

WORKDIR .

COPY . ./frontend

RUN cd frontend && npm i

ENTRYPOINT ["npm", "run", "start", "./frontend"]

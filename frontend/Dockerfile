FROM node:16.16.0-alpine3.15

WORKDIR .

COPY ./frontend .

RUN cd frontend && npm i

EXPOSE 8080
ENTRYPOINT ["npm", "run", "serve"]

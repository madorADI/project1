FROM node:16.16.0-alpine3.15

WORKDIR .

COPY backend ./backend

RUN cd backend && npm i

ENTRYPOINT ["npm", "run", "start", "./backend"]

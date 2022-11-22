FROM node:16.18

WORKDIR /code

COPY . .
RUN yarn install
RUN npm run build
CMD npm run start

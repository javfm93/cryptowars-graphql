FROM node:16.18

WORKDIR /code

COPY . .
RUN yarn install
RUN npm run build
RUN ls
RUN ls dist/
CMD npm run start

FROM node:11-alpine as base

WORKDIR /usr/frontend/app/

COPY package.json yarn.lock ./
RUN yarn

COPY . .

FROM base as develop
CMD ["yarn", "dev"]


FROM base as production
RUN yarn build
CMD ["yarn", "start"]

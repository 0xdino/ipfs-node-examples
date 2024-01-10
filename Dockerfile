FROM node:20
WORKDIR /app
COPY package.json ./
COPY pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i --frozen-lockfile
COPY . .
CMD [ "pnpm", "start:prod" ]
# react stage
FROM node:14.15.1 as builder

WORKDIR /app/frontend

COPY package.json yarn.lock ./

RUN npm install

COPY . ./

RUN npm run build

# nginx stage
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/frontend/build .
COPY --from=builder /app/frontend/default.conf /etc/nginx/conf.d/default.conf

ENTRYPOINT ["nginx", "-g", "daemon off;"]
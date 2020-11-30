FROM node:12.19.0 AS nodejs

WORKDIR /opt/ng

COPY ./e2e ./e2e
COPY ./src ./src
COPY ./karma.conf.js ./karma.conf.js
COPY ./angular.json ./angular.json
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.app.json ./tsconfig.app.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.spec.json ./tsconfig.spec.json
COPY ./tslint.json ./tslint.json

RUN npm install

ENV PATH="./node_modules/.bin:$PATH"

RUN ng build --prod

FROM nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=nodejs /opt/ng/dist/ecomm-admin /usr/share/nginx/html

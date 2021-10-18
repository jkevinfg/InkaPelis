FROM node:14

WORKDIR /srv/path

COPY . .

RUN npm install

EXPOSE 3000

ENV NODE_ENV = production

CMD ["node","index.js"]


# con el siguiente script creamos una imagen con nuestro de nuestro aplicativo

# docker build -t movies-api .

# y para ejecutar
## docker run -p 3000:3000 -d movies-api


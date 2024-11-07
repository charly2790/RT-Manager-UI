# Dockerfile para el frontend
FROM node:20.17.0

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install  # Instala las dependencias usando Yarn

COPY . .

EXPOSE 3000

CMD ["yarn", "dev","--host","0.0.0.0"]  # Comando para iniciar la aplicación
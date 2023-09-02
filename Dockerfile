FROM node:alpine


WORKDIR /app

COPY package.json .
RUN npm install
COPY ./ ./
EXPOSE 1900
CMD ["npm", "start"]
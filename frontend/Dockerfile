FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080
ENV REACT_APP_BACKEND_URL=http://localhost:5000

CMD npm run start
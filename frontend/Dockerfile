# Použijte oficiální Node.js obraz
FROM node:18

# Nastavte pracovní adresář na /app
WORKDIR /app

# Zkopírujte package.json a package-lock.json a nainstalujte závislosti
COPY package*.json ./
RUN npm install

# Zkopírujte všechny soubory do kontejneru
COPY . .

# Sestavte aplikaci

# Nastavte environmentální proměnnou pro běh aplikace
EXPOSE 8080
ENV REACT_APP_BACKEND_URL=http://localhost:5000

# Spusťte aplikaci po spuštění kontejneru
CMD npm run start
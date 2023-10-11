# Použijte oficiální Node.js obraz
FROM node:14

# Nastavte pracovní adresář na /app
WORKDIR /app

# Zkopírujte package.json a package-lock.json a nainstalujte závislosti
COPY package*.json ./
RUN npm install

# Zkopírujte všechny soubory do kontejneru
COPY . .

EXPOSE 5000
# Spusťte backendový server po spuštění kontejneru
CMD npm run start
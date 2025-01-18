# Use a imagem oficial do Node.js
FROM node:22

# Defina o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o código da aplicação
COPY . .

# Exponha a porta em que a API roda
EXPOSE 8080

# Comando para iniciar a aplicação
CMD ["npm", "start"]

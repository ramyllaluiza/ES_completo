# Usar uma imagem oficial do Node.js como base
FROM node:22

# Definir o diretório de trabalho dentro do container
WORKDIR /app

# Copiar o package.json e package-lock.json (ou yarn.lock) para dentro do container
COPY package*.json ./

# Instalar as dependências necessárias
RUN npm install

# Copiar o restante dos arquivos da aplicação
COPY . .

# Criar a aplicação para produção
RUN npm run build

# Expor a porta 3000 (ou a porta que sua aplicação React usa)
EXPOSE 3000

# Definir o comando para iniciar a aplicação
CMD ["npm", "start"]

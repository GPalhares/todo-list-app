# Usando a imagem oficial do Node.js
FROM node:18-alpine

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar o package.json e o package-lock.json
COPY package*.json ./

# Instalar as dependências
RUN npm install

# Copiar o restante do código do projeto para o contêiner
COPY . .

# Expor a porta que o Vite usa (padrão: 5173)
EXPOSE 5173

# Rodar o Vite no modo de desenvolvimento
CMD ["npm", "run", "dev", "--", "--host"]

# --- Base pour dev ---
FROM node:20-alpine AS dev
WORKDIR /usr/src/app

# installe d'abord deps (cache)
COPY package*.json ./
RUN npm ci

COPY . .
EXPOSE 4200
# le "start" est défini dans package.json (voir ci-dessous)
CMD ["npm","run","start"]

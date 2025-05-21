# 🔗 Encurtador de URLs - NestJS API

Este projeto é uma API para encurtar URLs longas em códigos curtos de até 6 caracteres. A aplicação é construída com **NestJS**, utilizando **SQLite** como banco de dados, **TypeORM** como ORM, **BCrypt** para segurança das senhas, e documentação interativa via **Swagger**.

## 🚀 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeORM](https://typeorm.io/)
- [SQLite](https://www.sqlite.org/)
- [BCrypt](https://github.com/kelektiv/node.bcrypt.js)
- [Swagger](https://swagger.io/)
- [Docker Compose](https://docs.docker.com/compose/)

---

## 📦 Como executar o projeto

### 1. Clone o repositório

git clone https://github.com/J0rg1t0/encurtador-url.git
cd encurtador-url

### 2. Inicialize via docker-compose
docker-compose up

### 3. Acesso ao Swagger para maiores informações sobre os endpoints disponíveis
localhost:3000/api/docs

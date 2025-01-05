# Takeat API

## Descrição

Este projeto é uma API desenvolvida em Node.js como parte de um teste técnico para a empresa **Takeat**. A aplicação foi construída utilizando boas práticas de desenvolvimento, TypeScript, e integrações com banco de dados via Sequelize.

---

## Funcionalidades

- Criação e leitura de dados.
- Autenticação de usuários com JWT.
- Validação de dados utilizando a biblioteca Yup.
- Configuração de ambiente com `dotenv`.

---

## Tecnologias Utilizadas

- **Node.js**
- **TypeScript**
- **Express**
- **Sequelize** (PostgreSQL)
- **Jest** para testes unitários e de integração
- **Docker** para gestão de serviços

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) (v16+)
- [Docker](https://www.docker.com/)
- [npm](https://www.npmjs.com/)

---

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/GutembergLamark/takeat-api.git
   cd takeat-api
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. Configure as variáveis de ambiente:

   Crie um arquivo `.env` na raiz do projeto e defina as variáveis de ambiente necessárias.

   POSTGRES_HOST=localhost
   POSTGRES_PORT=5432
   POSTGRES_USER=takeat_user
   POSTGRES_DB=takeat_db
   POSTGRES_PASSWORD=takeat_password
   NODE_PORT=3001
   SECRET_KEY=

4. Inicie a aplicação:

   ```bash
   npm run dev
   ```

---

## Scripts Disponíveis

### Desenvolvimento

- **`npm run dev`**: Inicia a API em ambiente de desenvolvimento, reiniciando automaticamente com `ts-node-dev`.

### Gestão de Serviços

- **`npm run services:up`**: Inicia os serviços definidos no `docker-compose.yaml`.
- **`npm run services:stop`**: Para os serviços Docker.
- **`npm run services:down`**: Remove os serviços Docker.

### Testes

- **`npm test`**: Executa todos os testes.
- **`npm run test:watch`**: Executa os testes em modo de observação (necessário que os serviços estejam em execução).

### Linter e Formatação

- **`npm run lint:prettier:check`**: Verifica se o código está formatado corretamente com Prettier.
- **`npm run lint:prettier:fix`**: Formata o código automaticamente com Prettier.

---

## Testes

1. Execute os testes:

   ```bash
   npm test
   ```

---

## Autor

Desenvolvido por **Gutemberg Lamark**.


# Tribunal de Contas de Sergipe

Este é o projeto ElasticChat, uma API desenvolvida em Node para aprimorar o sistema de busca do site de decisões judiciais do estado e criação de um chatBot para conversa em linguagem natural sobre essas decisões. O projeto inclui CRUD completo do ElastiSearch, além de integração com a API da OpenAI. 


## Stack utilizada

**Node:** 
Node.js é um ambiente de execução que permite rodar JavaScript no servidor, facilitando a criação de aplicações web rápidas e escaláveis.

**Express:** Framework para Node.js que facilita a criação de API 's. 

**Nodemon:** Ferramenta que reinicia automaticamente o servidor quando ver alterações no código, facilitando o desenvolvimento. 

**ElasticSearch:** Banco de dados vetorial de busca e análise de dados em tempo real, que permite encontrar informações rapidamente em grandes volumes de dados.

**Multer:** Middleware para Express que lida com o upload de arquivos.

**PDF-Parse:** Biblioteca usada para extrair texto e informações de arquivos PDF no Node.js.

**Postgres:** Banco de dados relacional.




## Funcionalidades

- Rotas para CRUD Completo do Elastic.
- Rota para chat.
- Sistema de Login



## Instalação

### Pré-requisitos

- Node instalado
- Docker instalado 

### Passos

1. Clone o repositório:

   ```bash
   git clone https://github.com/pedrohp2205/elasticsearch-chatgpt.git
   cd elasticsearch-chatgpt
   ```

2. Instale as dependências node:

   ```bash
   npm install
   ```

3. Inicialize a imagem no docker:

   ```bash
   docker compose up
   ```

4. Inicialize a API:

   ```bash
   npm run dev
   ```


6. Acesse o elastic em [http://127.0.0.1:5601](http://127.0.0.1:5601).

## Estrutura do Projeto

```plaintext
elasticsearch-chatgpt/
│
├── src/               # Aplicação principal da plataforma
│   ├── controllers/        # Recebimento das rotas
│   ├── routes/             # Configuraçao das Rotas
│   ├── service/            # CRUD do Elastic e Integração com a OpenAI
│   ├── uploads/            # Recebimento temporário dos arquivos PDF
│   ├── utils/              # Funções utilitárias
│   └── server.js           # Servidor express
│   
│ 
│
├── package.json            # Dependências do projeto
├── docker-compose.yaml     # Imagem Docker
└── README.md               # Documentação do projeto
```


    
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`OPENAI_APIKEY`
`POSTGRES_URL`




## Documentação da API

#### Cria uma Usuário

```http
  POST /users
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `nome` | `string` | **Obrigatório**. |




#### Cria uma decisão

```http
  POST /decisions
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `File` | `pdf` | **Obrigatório**. Arquivo pdf. |

#### Retorna decisão que contém o conteúdo informado

```http
  GET /decisions
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `contentQuery`      | `string` | **Obrigatório**.  |


#### Deleta decisão com esse ID
```http
  DELETE /decisions
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `decisionId`      | `uuid` | **Obrigatório**.  |

#### Retorna resposta da API da OpenAI
```http
  GET /chat
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `message`      | `json` | **Obrigatório**. Envia via corpo da requisição. |




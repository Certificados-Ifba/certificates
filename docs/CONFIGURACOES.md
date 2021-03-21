# Configurações

Nesse documento você irá encontrar todas as configurações do projeto de backend.
Além disso, você pode encontrar um guia na sessão [como rodar](#como-rodar), explicando as diferentes formas para inicializar o projeto.

## Como rodar

O projeto pode ser inicializado de várias formas:

### Rodando com Docker

Instale o [Docker](https://docs.docker.com/get-docker/) e [docker-compose](https://docs.docker.com/compose/gettingstarted/) na suas versões mais recentes, então rode os seguintes comandos:

```sh
docker network create infrastructure && cp .env.example .env
docker-compose up -d
```

Você irá ver a seguinte mensagem:

```sh
Creating certificates_mailer_1     ... done
Creating certificates_db_1         ... done
Creating certificates_gateway_1    ... done
Creating certificates_web_1        ... done
Creating certificates_permission_1 ... done
Creating certificates_user_1       ... done
Creating certificates_event_1      ... done
Creating certificates_token_1      ... done
```


## Variáveis de ambiente

### Configurações do Node.js

- `NODE_ENV`: Determina o ambiente onde a API será executada; Possíveis valores: `production|test|development`

**Obs:** Ao usar `NODE_ENV=test` as demais variáveis de ambiente devem ser prefixadas com `TEST_*`

### Configurações da API

- `API_PORT`: Define a porta onde a API será inicializada. Padrão: `3000`.
- `APP_SECRET`: Define um secret para ser utilizado na criação do token JWT. Padrão: `Gerar uma hash aleatória`.
- `MONGO_DATABASE`: Define o nome do banco de dados. Padrão: `certificates`.
- `MONGO_USER`: Define . Padrão: `mongo`.
- `MONGO_PASSWORD`: Define . Padrão: `pass`.
- `MONGO_PORT`: Define . Padrão: `27017`.
- `MONGO_HOST`: Define . Padrão: `db`.
- `API_GATEWAY_PORT`: Define . Padrão: `3000`.
- `EVENT_SERVICE_PORT`: Define . Padrão: `3001`.
- `EVENT_SERVICE_HOST`: Define . Padrão: `event`.
- `TOKEN_SERVICE_PORT`: Define . Padrão: `3002`.
- `TOKEN_SERVICE_HOST`: Define . Padrão: `token`.
- `USER_SERVICE_PORT`: Define . Padrão: `3003`.
- `USER_SERVICE_HOST`: Define . Padrão: `user`.
- `MAILER_SERVICE_PORT`: Define . Padrão: `3004`.
- `MAILER_SERVICE_HOST`: Define . Padrão: `mailer`.
- `PERMISSION_SERVICE_PORT`: Define . Padrão: `3005`.
- `PERMISSION_SERVICE_HOST`: Define . Padrão: `permission`.
- `BASE_URI`: Define . Padrão: `http://localhost`.
- `MAILER_DISABLED`: Define . Padrão: `0`.
- `MAILER_HOST`: Define . Padrão: `smtp.mailtrap.io`.
- `MAILER_PORT`: Define . Padrão: `2525`.
- `MAILER_TLS`: Define . Padrão: `0`.
- `MAILER_SECURE`: Define . Padrão: `0`.
- `MAILER_USER`: Define . Padrão: `86cffca9b56993`.
- `MAILER_PASS`: Define . Padrão: `faf9444ad40c71`.
- `MAILER_FROM`: Define . Padrão: `"Não responda" <certificados@ifba.edu.br>`.

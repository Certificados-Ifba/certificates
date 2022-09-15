# Certificates

## Running the example with docker-compose

Execute `docker network create infrastructure && cp .env.example .env && docker-compose up -d` from the root of the repository

## Accessing the API itself and swagger docs for the API

- Once you launch the API it will be accessible on port 3000.
- Swagger docs for the API will be accessible locally via URI "**http://localhost:3000/api**"

## Brief architecture overview

This API showcase consists of the following parts:

- API gateway
- Token service - responsible for creating, decoding, destroying JWT tokens for users
- User service - responsible for CRUD operations on users
- Mailer service - responsible for sending out emails (confirm sign up)
- Permission service - responsible for verifying permissions for logged in users.
- Events service - responsible for CRUD operations on users events records
- The service interact via **TCP sockets**

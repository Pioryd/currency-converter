# Currency converter

## Build with

- **Backend**: NestJS, Sequelize, TypeScript
- **Frontend**: React, Material UI, TypeScript

## Tests

Includes simple e2e test

More test in Express/React with Jest and Cypress: [Github - ecommerce-marketplace](https://github.com/Pioryd/ecommerce-marketplace)

## Client - example .env

In client root directory create:

- .env.development .env.production .env.test

```environment
REACT_APP_API_URL=http://localhost:3000
```

## Server - example .env

In server root directory create:

- .env.development .env.production .env.test

```environment
DB_DIALECT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_DATABASE=currency
DB_AUTO_LOAD_MODELS=true
DB_SYNCHRONIZE=true
```
# Currency converter

## Live preview: [DEMO](http://ec2-3-142-143-221.us-east-2.compute.amazonaws.com/currency-converter)

## Build with

- **Backend**: bignumber.js, NestJS, Sequelize, TypeScript
- **Frontend**: React, Material UI, TypeScript

## External currency API

- Register to get your free API_KEY
- Link: [rapidapi - fyhao](https://rapidapi.com/fyhao/api/currency-exchange)

## Tests

Includes simple e2e test

More test in Express/React with Jest and Cypress: [Github - ecommerce-marketplace](https://github.com/Pioryd/ecommerce-marketplace)

## Client - example .env

In client root directory create:

- .env.development .env.production .env.test

```environment
REACT_APP_API_URL=http://localhost:8080
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

# How to get more information above "External currency API"
API_KEY=123

WEB_SERVER=false
```

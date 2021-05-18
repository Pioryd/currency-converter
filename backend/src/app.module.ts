import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CurrenciesModule } from './currencies/currencies.module';

const path = require('path');
require('dotenv').config({ path: path.join(`.env.${process.env.NODE_ENV}`) });

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST as any,
      port: process.env.DB_PORT as any,
      username: process.env.DB_USERNAME as any,
      password: process.env.DB_PASSWORD as any,
      database: process.env.DB_DATABASE as any,
      autoLoadModels: process.env.DB_AUTO_LOAD_MODELS === 'true',
      synchronize: process.env.DB_SYNCHRONIZE === 'true',
    }),
    CurrenciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

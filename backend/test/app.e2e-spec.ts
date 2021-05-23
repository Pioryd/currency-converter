import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/currency/convert (POST)', () => {
    return request(app.getHttpServer())
      .post('/currency/convert')
      .send({ currencyFrom: 'EUR', currencyTo: 'EUR', valueFrom: 10 })
      .expect(201)
      .expect({
        currencyFrom: 'EUR',
        currencyTo: 'EUR',
        valueFrom: 10,
        valueTo: '10.00',
      });
  });

  it('/currency/get-list (POST)', () => {
    return request(app.getHttpServer()).post('/currency/get-list').expect(201);
  });
});

import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { BigNumber } from 'bignumber.js';

import { CurrencyData } from './interfaces/currency-data.interface';
import { History } from './models/history.model';

@Injectable()
export class CurrenciesService {
  list: string[];

  constructor(
    @InjectModel(History)
    private historyModel: typeof History,
    private httpService: HttpService,
  ) {
    this.list = [];
  }

  async convert({
    currencyFrom,
    currencyTo,
    valueFrom,
  }: CurrencyData): Promise<CurrencyData> {
    const { data } = await this.httpService
      .get<string>(`https://currency-exchange.p.rapidapi.com/exchange`, {
        params: { to: currencyTo, from: currencyFrom },
        headers: {
          'x-rapidapi-key':
            '648f4982admsh8375f42db2eda1dp159e7cjsnaa1ebc0ae5f4',
          'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
        },
      })
      .toPromise();

    const currencyRate = data;

    const response: CurrencyData = {
      currencyFrom,
      currencyTo,
      valueFrom,
      valueTo: new BigNumber(valueFrom)
        .times(currencyRate)
        .toFixed(2)
        .toString(),
    };

    this.historyModel.create(response);

    return response;
  }

  async getList(): Promise<string[]> {
    if (this.list.length === 0) {
      const { data } = await this.httpService
        .get(`https://currency-exchange.p.rapidapi.com/listquotes`, {
          headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': 'currency-exchange.p.rapidapi.com',
          },
        })
        .toPromise();

      this.list = data;
    }

    return this.list;
  }

  async getHistory(): Promise<History[]> {
    return this.historyModel.findAll({
      order: [['createdAt', 'DESC']],
      limit: 5,
    });
  }
}

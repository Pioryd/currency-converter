import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';

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
      .get(
        `https://api.ratesapi.io/api/latest?` +
          `base=${currencyFrom}&symbols=${currencyTo}`,
      )
      .toPromise();

    const response: CurrencyData = {
      currencyFrom,
      currencyTo,
      valueFrom,
      valueTo: Number((valueFrom * data.rates[currencyTo]).toPrecision(3)),
    };

    this.historyModel.create(response);

    return response;
  }

  async getList(): Promise<string[]> {
    if (this.list.length === 0) {
      const { data } = await this.httpService
        .get(`https://api.ratesapi.io/api/latest`)
        .toPromise();
      this.list = [...Object.keys(data.rates), data.base];
    }

    return this.list;
  }
}

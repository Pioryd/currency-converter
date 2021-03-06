import { Body, Controller, Post } from '@nestjs/common';

import { CurrenciesService } from './currencies.service';
import { ConvertCurrencyDto } from './dto/convert-currency.dto';
import { CurrencyData } from './interfaces/currency-data.interface';
import { History } from './models/history.model';

@Controller('api/currency')
export class CurrenciesController {
  constructor(private readonly currenciesService: CurrenciesService) {}

  @Post('convert')
  async convert(
    @Body() convertCurrencyDto: ConvertCurrencyDto,
  ): Promise<CurrencyData> {
    return this.currenciesService.convert(convertCurrencyDto);
  }

  @Post('get-list')
  async getList(): Promise<string[]> {
    return this.currenciesService.getList();
  }

  @Post('get-history')
  async getHistory(): Promise<History[]> {
    return this.currenciesService.getHistory();
  }
}

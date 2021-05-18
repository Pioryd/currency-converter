import { Module, HttpModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { History } from './models/history.model';

@Module({
  imports: [SequelizeModule.forFeature([History]), HttpModule],
  controllers: [CurrenciesController],
  providers: [CurrenciesService],
})
export class CurrenciesModule {}

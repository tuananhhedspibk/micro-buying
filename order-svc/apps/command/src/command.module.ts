import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EventSourcingModule } from 'nestjs-event-sourcing';

import { CreateOrderModule } from './create-order/create-order.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    EventSourcingModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        mongoUrl: config.get('COMMAND_DB_URL'),
      }),
      inject: [ConfigService],
    }),
    CreateOrderModule,
  ],
})
export class CommandModule {}

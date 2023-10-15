import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { EventSourcingModule } from 'nestjs-event-sourcing';

import { CreateItemModule } from './create-item/create-item.module';
import { UpdateItemModule } from './update-item/update-item.module';

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
    CreateItemModule,
    UpdateItemModule,
  ],
})
export class CommandModule {}

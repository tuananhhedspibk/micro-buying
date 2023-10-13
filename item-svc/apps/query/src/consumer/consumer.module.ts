import { Module } from '@nestjs/common';
import { ItemCreatedModule } from './item-created/item-created.module';

@Module({ imports: [ItemCreatedModule] })
export class ConsumerModule {}

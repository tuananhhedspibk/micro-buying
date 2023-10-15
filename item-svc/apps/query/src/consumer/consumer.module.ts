import { Module } from '@nestjs/common';
import { ItemCreatedModule } from './item-created/item-created.module';
import { ItemUpdatedModule } from './item-updated/item-updated.module';

@Module({ imports: [ItemCreatedModule, ItemUpdatedModule] })
export class ConsumerModule {}

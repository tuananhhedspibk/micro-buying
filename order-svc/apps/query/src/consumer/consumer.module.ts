import { Module } from '@nestjs/common';
import { OrderCreatedModule } from './order-created/order-created.module';

@Module({ imports: [OrderCreatedModule] })
export class ConsumerModule {}

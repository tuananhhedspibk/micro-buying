import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [AuthModule, ItemModule, OrderModule],
})
export class AppModule {}

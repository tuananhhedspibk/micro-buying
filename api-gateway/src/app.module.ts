import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [AuthModule, ItemModule],
})
export class AppModule {}

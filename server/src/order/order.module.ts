import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER, OrderSchema } from './order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ORDER.name, schema: OrderSchema }]),
  ],
  providers: [OrderResolver, OrderService],
})
export class OrderModule {}

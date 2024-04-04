import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsResolver } from './order_details.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER_DETAILS, OrderDetailsSchema } from './order_details.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ORDER_DETAILS.name, schema: OrderDetailsSchema },
    ]),
  ],
  providers: [OrderDetailsResolver, OrderDetailsService],
})
export class OrderDetailsModule {}

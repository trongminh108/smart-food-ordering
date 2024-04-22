import { Module } from '@nestjs/common';
import { OrderDetailsService } from './order_details.service';
import { OrderDetailsResolver } from './order_details.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER_DETAILS, OrderDetailsSchema } from './order_details.schema';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ORDER_DETAILS.name, schema: OrderDetailsSchema },
    ]),
    ProductModule,
  ],
  providers: [OrderDetailsResolver, OrderDetailsService],
  exports: [OrderDetailsService, OrderDetailsResolver],
})
export class OrderDetailsModule {}

import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { ORDER, OrderSchema } from './order.schema';
import { AgentModule } from 'src/agent/agent.module';
import { UserModule } from 'src/user/user.module';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { OrderDetailsModule } from 'src/order_details/order_details.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: ORDER.name, schema: OrderSchema }]),
    AgentModule,
    UserModule,
    OrderDetailsModule,
  ],
  providers: [OrderResolver, OrderService],
  exports: [OrderService],
})
export class OrderModule {}

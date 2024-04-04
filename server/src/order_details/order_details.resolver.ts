import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailInput, UpdateOrderDetailInput } from 'src/graphql';

@Resolver('OrderDetail')
export class OrderDetailsResolver {
  constructor(private readonly orderDetailsService: OrderDetailsService) {}

  @Mutation('createOrderDetail')
  create(
    @Args('createOrderDetailInput')
    createOrderDetailInput: CreateOrderDetailInput,
  ) {
    return this.orderDetailsService.create(createOrderDetailInput);
  }

  @Query('orderDetails')
  findAll() {
    return this.orderDetailsService.findAll();
  }

  @Query('orderDetail')
  findOne(@Args('id') id: string) {
    return this.orderDetailsService.findOne(id);
  }

  @Mutation('updateOrderDetail')
  update(
    @Args('updateOrderDetailInput')
    updateOrderDetailInput: UpdateOrderDetailInput,
  ) {
    return this.orderDetailsService.update(updateOrderDetailInput);
  }

  @Mutation('removeOrderDetail')
  remove(@Args('id') id: string) {
    return this.orderDetailsService.remove(id);
  }
}

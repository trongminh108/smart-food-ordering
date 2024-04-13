import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { OrderDetailsService } from './order_details.service';
import { CreateOrderDetailInput, UpdateOrderDetailInput } from 'src/graphql';
import { ProductService } from 'src/product/product.service';

@Resolver('OrderDetail')
export class OrderDetailsResolver {
  constructor(
    private readonly orderDetailsService: OrderDetailsService,
    private readonly productService: ProductService,
  ) {}

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

  @ResolveField('product')
  async product(@Parent() orderDetails) {
    return await this.productService.findOne(orderDetails.id_product);
  }
}

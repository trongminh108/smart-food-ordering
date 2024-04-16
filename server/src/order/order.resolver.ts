import { UserService } from './../user/user.service';
import {
  Resolver,
  Query,
  Mutation,
  Args,
  ResolveField,
  Parent,
  Subscription,
} from '@nestjs/graphql';
import { OrderService } from './order.service';
import { CreateOrderInput, UpdateOrderInput } from 'src/graphql';
import { AgentService } from 'src/agent/agent.service';
import { OrderDetailsService } from 'src/order_details/order_details.service';
import { PubSub } from 'graphql-subscriptions';

@Resolver('Order')
export class OrderResolver {
  pubSub: PubSub = new PubSub();
  PUSH_INFO_ORDER = 'PUSH_INFO_ORDER';
  constructor(
    private readonly orderService: OrderService,
    private readonly agentService: AgentService,
    private readonly userService: UserService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  @Mutation('createOrder')
  create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput);
  }

  @Query('orders')
  findAll() {
    this.pubSub.publish(this.PUSH_INFO_ORDER, {
      pubInfoOrder: 'Get all orders',
    });
    return this.orderService.findAll();
  }

  @Query('order')
  findOne(@Args('id') id: string) {
    return this.orderService.findOne(id);
  }

  @Query('ordersByUserID')
  ordersByUserID(@Args('id') id: string) {
    return this.orderService.findAll({ id_user: id });
  }

  @Mutation('updateOrder')
  update(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput);
  }

  @Mutation('removeOrder')
  remove(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @ResolveField('agent')
  async agent(@Parent() order) {
    return await this.agentService.findOne(order.id_agent);
  }

  @ResolveField('user')
  async user(@Parent() order) {
    return await this.userService.findOne(order.id_user);
  }

  @ResolveField('order_details')
  async order_details(@Parent() order) {
    return await this.orderDetailsService.findAll({ id_order: order.id });
  }

  @Subscription('pubInfoOrder')
  helloFunc() {
    return this.pubSub.asyncIterator(this.PUSH_INFO_ORDER);
  }
}

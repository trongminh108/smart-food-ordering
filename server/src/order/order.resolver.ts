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
import { STATUS_PENDING } from 'src/constants';

@Resolver('Order')
export class OrderResolver {
  pubSub: PubSub = new PubSub();
  PUSH_INFO_ORDER = 'PUSH_INFO_ORDER';
  PUB_NEW_ORDER = 'PUB_NEW_ORDER';
  PUB_USER_STATUS_ORDER = 'PUB_USER_STATUS_ORDER';

  constructor(
    private readonly orderService: OrderService,
    private readonly agentService: AgentService,
    private readonly userService: UserService,
    private readonly orderDetailsService: OrderDetailsService,
  ) {}

  @Mutation('createOrder')
  async create(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    const newOrder = await this.orderService.create(createOrderInput);
    this.pubSub.publish(this.PUB_NEW_ORDER, { pubNewOrder: newOrder });
    return newOrder;
  }

  @Query('orders')
  findAll() {
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

  @Query('ordersByAgentID')
  ordersByAgentID(@Args('id') id: string) {
    return this.orderService.findAll({ id_agent: id });
  }

  @Mutation('updateOrder')
  async update(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    const updatedOrder = await this.orderService.update(updateOrderInput);
    this.pubSub.publish(this.PUB_NEW_ORDER, { pubNewOrder: updatedOrder });
    this.pubSub.publish(this.PUB_USER_STATUS_ORDER, {
      pubUserStatusOrder: updatedOrder,
    });
    return updatedOrder;
  }

  @Mutation('removeOrder')
  remove(@Args('id') id: string) {
    return this.orderService.remove(id);
  }

  @Mutation('removeOrderByUserID')
  removeOrderByUserID(@Args('id') id: string) {
    return this.orderService.removeMany({ id_user: id });
  }

  @Mutation('removeAllDataOrder')
  async removeAllData() {
    try {
      await this.orderService.removeAllData();
      return 'Deleted all data in Order Table';
    } catch (error) {
      return 'Deleted Error';
    }
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

  @Subscription('pubNewOrder', {
    filter(payload, variables, context) {
      return (
        payload.pubNewOrder.id_agent === variables.id_agent &&
        payload.pubNewOrder.status === STATUS_PENDING
      );
    },
  })
  pubNewOrder() {
    return this.pubSub.asyncIterator(this.PUB_NEW_ORDER);
  }

  @Subscription('pubUserStatusOrder', {
    filter(payload, variables, context) {
      return payload.pubUserStatusOrder.id_user === variables.id_user;
    },
  })
  pubUserStatusOrder() {
    return this.pubSub.asyncIterator(this.PUB_USER_STATUS_ORDER);
  }
}
